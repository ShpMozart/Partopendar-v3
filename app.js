const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const userRouter = require("./routes/userRoutes");
const ticketRouter = require("./routes/ticketRoutes");
const messageRouter = require("./routes/messageRoutes");
const fileRouter = require("./routes/fileRoutes");
const workerMessageRouter = require("./routes/workerMessageRoutes");
const workerFileRouter = require("./routes/workerFileRoutes");
const factorFileRouter = require("./routes/factorFileRoutes");
const faultWorkerFileRouter = require("./routes/faultWorkerFileRoutes");
const cityRouter = require("./routes/cityRoutes");
const centerRouter = require("./routes/centerRoutes");
const viewRouter = require("./routes/viewRoutes");
const factorRouter = require("./routes/factorRoutes");
const gozareshRouter = require("./routes/gozareshRoutes");
const errorHandler = require("./controllers/errorController");
// Start express app
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Database
const db = require("./db/database");
const User = require("./models/User");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

User.sync()
  .then(() => console.log("User table created successfully"))
  .catch((err) => console.log("User table not created,  error"));

app.use(cors());

app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/files", fileRouter);
app.use("/api/v1/workerMessages", workerMessageRouter);
app.use("/api/v1/workerFiles", workerFileRouter);
app.use("/api/v1/faultWorkerFiles", faultWorkerFileRouter);
app.use("/api/v1/factorFile", factorFileRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/center", centerRouter);
app.use("/api/v1/factor", factorRouter);
app.use("/api/v1/gozaresh", gozareshRouter);
app.use("/", viewRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//app.use(errorHandler);
module.exports = app;
