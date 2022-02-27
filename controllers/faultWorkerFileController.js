const catchAsync = require("./../utils/catchAsync");
const multer = require("multer");
const FaultWorkerFile = require("./../models/FaultWorkerFile");
const User = require("./../models/User");
const Ticket = require("../models/Ticket");
const Email = require("./../utils/email");
const fs = require("fs");

FaultWorkerFile.belongsTo(User, {
  as: "faultWorkerUser",
  foreignKey: "faultWorkerId",
});
const create = async ({ faultWorkerId, from, faultFileAddress }) => {
  return await FaultWorkerFile.create({
    faultWorkerId,
    from,
    faultFileAddress,
  });
};
const storage = multer.diskStorage({
  destination: "./workerFaultUploads/",
  filename: function (req, file, cb) {
    const date = new Date();
    cb(
      null,
      req.user.username + "-" + date.toDateString() + "-" + file.originalname
    );
  },
});
const upload = multer({ storage: storage });
exports.fields = upload.single("pdf");
exports.save = catchAsync(async (req, res, next) => {
  let file = req.file;
  if (!req.file) {
    return next();
  }
  let name = file.filename;
  create({
    faultWorkerId: req.user.id,
    from: req.user.role,
    faultFileAddress: name,
  }).then((file) => {
    req.fileId = file.id;
    res.status(200).json({
      data: file,
    });
    //next();
  });

  // new Email(
  //   JSON.stringify(`You have file from : ${req.user.username} `)
  // ).setup();
});

exports.getFiles = catchAsync(async (req, res, next) => {
  const file = await FaultWorkerFile.findAll({
    where: req.query,
  });
  res.status(200).json({
    status: "success",
    results: file.length,
    data: {
      file,
    },
  });
});
exports.getFile = catchAsync(async (req, res, next) => {
  const file = await FaultWorkerFile.findByPk(req.params.id);
  res.download(__dirname + "/../workerFaultUploads/" + file.faultFileAddress);
});
exports.downloadFile = catchAsync(async (req, res, next) => {
  const file = await FaultWorkerFile.findByPk(req.params.id);
  console.log(file);
  res.download(__dirname + "/../workerFaultUploads/" + file.faultFileAddress);
});
exports.showReq = catchAsync(async (req, res, next) => {
  next();
});
exports.deleteFile = catchAsync(async (req, res, next) => {
  const file = await FaultWorkerFile.findByPk(req.params.id);
  console.log("file is deleted");
  fs.unlinkSync(__dirname + "/../workerFaultUploads/" + file.faultFileAddress);
  res.status(200).json({
    status: "success",
    msg: "deleted",
  });
});
