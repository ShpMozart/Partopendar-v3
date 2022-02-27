const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const path = require("path");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/User");

//add user to db
const createUser = async ({
  username,
  password,
  firstName,
  lastName,
  role,
  passwordChanged,
}) => {
  return await User.create({
    username,
    password,
    firstName,
    lastName,
    role,
    passwordChanged,
  });
};
//update user password in db
const updateUserPassword = async (user, { password, passwordChanged }) => {
  return await user.update({
    password,
    passwordChanged,
  });
};

//get user from db
const getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

//sign jwt token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//sign jwt token
const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};
//save jwt in cookie and route to panel.html or password.html
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  /////////////////////////////// HATMAN CHECK SHAVAD ////////////////////////
  let showPath = path.join(__dirname + "/../public/htmls/password.html");
  if (!user.dataValues.passwordChanged) {
    return res.sendFile(showPath);
  } else {
    if (user.dataValues.role === "admin") {
      //panel admin
      showPath = path.join(__dirname + "/../public/admin.html");
      return res.sendFile(showPath);
    } else if (user.dataValues.role === "boss") {
      //panel boss
      showPath = path.join(__dirname + "/../public/htmls/panel-admin.html");
      return res.sendFile(showPath);
    } else if (user.dataValues.role === "client") {
      //panel client
      showPath = path.join(__dirname + "/../public/htmls/panel-cust.html");
      return res.sendFile(showPath);
    } else if (user.dataValues.role === "worker") {
      //panel worker
      showPath = path.join(__dirname + "/../public/htmls/panel-worker.html");
      return res.sendFile(showPath);
    }
  }
};
const createSendRefreshToken = async (user, req, res) => {
  const refreshToken = signRefreshToken(user.id);
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
};

//register user (permission:admin)
exports.signup = catchAsync(async (req, res, next) => {
  const user = await getUser({ username: req.body.username });
  if (user) return res.status(409).json({ message: "username already exists" });

  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    createUser({
      username: req.body.username,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      passwordChanged: false,
    }).then((user) => {
      user.password = undefined;
      res.status(200).json({ user, msg: "account created successfully" });
    });
  });
});
//login user (all roles)
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    let user = await getUser({ username: username });
    if (!user) {
      return res.status(401).json({ message: "No such user found" });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        res.status(403).json({ message: "incorrect password" });
      }
      if (result) {
        createSendRefreshToken(user, req, res);
        createSendToken(user, 200, req, res);
      } else {
        res.status(403).json({ message: "incorrect password" });
      }
    });
  }
});
//check if user logged in
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // if (!req.cookies.refreshToken) {
  //   return next(new AppError("Please log in to get access.", 401));
  // }

  // 2) Verification token
  let decoded;
  let decodedRefreshToken;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err) {
      const rToken = req.cookies.refreshToken;
      try {
        decodedRefreshToken = await promisify(jwt.verify)(
          rToken,
          process.env.JWT_REFRESH_SECRET
        );
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return next(new AppError("Please log in to get access.", 401));
        }
      }

      const token = signToken(decodedRefreshToken.id);
      res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      });
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    }
  }
  // 3) Check if user still exists
  const freshUser = await User.findByPk(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});
//update user password when first time logged in
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await getUser({ username: req.user.dataValues.username });
  // 2) If so, update password
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    updateUserPassword(user, {
      password: hash,
      passwordChanged: true,
    }).then((user) => {
      createSendToken(user, 200, req, res);
    });
  });
  // User.findByIdAndUpdate will NOT work as intended!
  // 3) Log user in, send JWT
});
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // 2) Check if user still exists
      const freshUser = await User.findByPk(decoded.id);
      if (!freshUser) {
        return next();
      }
      // THERE IS A LOGGED IN USER
      req.user = freshUser;
      res.locals.user = freshUser;
      const loader = path.join(__dirname + "/../public/htmls/loader.html");
      res.sendFile(loader);
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.cookie("refreshToken", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
