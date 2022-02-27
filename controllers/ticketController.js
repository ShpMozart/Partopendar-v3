//coded in github for fun
const Ticket = require("./../models/Ticket");
const User = require("./../models/User");
const File = require("./../models/File");
const WorkerFile = require("./../models/WorkerFile");
const FaultWorkerFile = require("./../models/FaultWorkerFile");
const FactorFile = require("./../models/FactorFile");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Message = require("../models/Message");
const WorkerMessage = require("../models/WorkerMessage");

const Email = require("./../utils/email");
const Factor = require("../models/Factor");
//Ticket.sync({ force: true });
//FactorFile.sync({ force: true });
Ticket.belongsTo(User, { as: "senderUser", foreignKey: "senderId" });
Ticket.belongsTo(User, { as: "workerUser", foreignKey: "workerId" });
Ticket.belongsTo(User, { as: "faultWorkerUser", foreignKey: "faultWorkerId" });
Ticket.hasMany(Message, { as: "message", foreignKey: "ticketId" });
Ticket.hasMany(WorkerMessage, { as: "workerMessage", foreignKey: "ticketId" });

Ticket.belongsTo(File, { foreignKey: "fileId" });
Ticket.belongsTo(WorkerFile, { foreignKey: "workerFileId" });
Ticket.belongsTo(FaultWorkerFile, { foreignKey: "faultWorkerFileId" });
Ticket.belongsTo(FactorFile, { foreignKey: "factorFileId" });

Ticket.hasMany(Factor, { foreignKey: "ticketId" });

exports.getAll = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findAll({
    where: req.query,
  });
  res.status(200).json({
    status: "success",
    results: ticket.length,
    data: {
      ticket,
    },
  });
});
exports.getAllClientTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findAll({
    where: {
      senderId: req.user.id,
    },
  });

  res.status(200).json({
    status: "success",
    results: ticket.length,
    data: {
      ticket,
    },
  });
});
exports.getAllWorkerTicket = catchAsync(async (req, res, next) => {
  let ticket = await Ticket.findAll({
    where: {
      workerId: req.user.id,
    },
  });
  if (ticket.length == 0) {
    ticket = await Ticket.findAll({
      where: {
        faultWorkerId: req.user.id,
      },
    });
  }
  res.status(200).json({
    status: "success",
    results: ticket.length,
    data: {
      ticket,
    },
  });
});

exports.getAllFaultWorkerTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findAll({
    where: {
      faultWorkerId: req.user.id,
    },
  });
  if (ticket.length == 0) {
    ticket = await Ticket.findAll({
      where: {
        faultWorkerId: req.user.id,
      },
    });
  }
  res.status(200).json({
    status: "success",
    results: ticket.length,
    data: {
      ticket,
    },
  });
});

exports.getAllFaultWorkerTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findAll({
    where: {
      faultWorkerId: req.user.id,
    },
  });
  res.status(200).json({
    status: "success",
    results: ticket.length,
    data: {
      ticket,
    },
  });
});
exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "senderUser",
        //attributes: ["username"],
      },
      {
        model: User,
        as: "workerUser",
        //attributes: ["username"],
      },
      {
        model: Message,
        as: "message",
        //attributes: ["username"],
      },
      {
        model: WorkerMessage,
        as: "workerMessage",
        //attributes: ["username"],
      },
      {
        model: Factor,
      },
      {
        model: File,
        //attributes: ["username"],
      },
      {
        model: WorkerFile,
        //attributes: ["username"],
      },
      {
        model: FactorFile,
        //attributes: ["username"],
      },
    ],
  });
  if (!ticket) {
    return next(new AppError("No ticket found with that ID", 404));
  }
  //edited
  if (req.user.role != "admin" && req.user.role != "boss") {
    if (req.user.id != ticket.senderId) {
      if (req.user.id != ticket.workerId) {
        if (req.user.id != ticket.faultWorkerId) {
          return next(new AppError("No ticket found with that ID", 404));
        }
      }
    }
  }
  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
});
const createTicket = async ({
  senderId,
  workerId,
  faultWorkerId,
  senderName,
  city,
  center,
  title,
  text,
  fileId,
  workerFileId,
  status,
  signedByClient,
  acceptedByWorker,
  faultAcceptedByWorker,
  ticketSigning,
}) => {
  return await Ticket.create({
    senderId,
    workerId,
    faultWorkerId,
    senderName,
    city,
    center,
    title,
    text,
    fileId,
    workerFileId,
    status,
    signedByClient,
    acceptedByWorker,
    faultAcceptedByWorker,
    ticketSigning,
  });
};
exports.createTicket = catchAsync(async (req, res, next) => {
  createTicket({
    senderId: req.user.id,
    workerId: req.body.workerId,
    senderName: req.user.username,
    city: req.body.city,
    center: req.body.center,
    title: req.body.title,
    text: req.body.text,
    fileId: req.body.fileId,
    workerFileId: req.body.workerFileId,
    status: req.body.status,
  }).then((ticket) => {
    new Email(
      `Sender : ${ticket.senderName}\n City : ${ticket.city}\n Center : ${ticket.center}\n
      Title : ${ticket.title}\n Text : ${ticket.text}\n `
    ).setup();
    res.status(201).json({
      status: "success",
      ticket,
    });
  });
});
exports.updateTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "workerUser",
        //attributes: ["username"],
      },
      {
        model: User,
        as: "faultWorkerUser",
        //attributes: ["username"],
      },
      {
        model: WorkerMessage,
        as: "workerMessage",
        //attributes: ["username"],
      },
    ],
  });
  const newTicket = await ticket.update(req.body);
  if (!ticket) {
    return next(new AppError("No user found with that ID", 404));
  }
  if (newTicket.faultAcceptedByWorker == false) {
    const workerUsername = ticket.faultWorkerUser.username;
    const workerMessage = ticket.workerMessage[1].text;
    new Email(
      `${workerUsername} reject your ticket \n Message : ${workerMessage}`
    ).setup(); //send email if ticket send by client
    await ticket.update({
      faultWorkerId: null,
    });
  }
  if (newTicket.acceptedByWorker == false) {
    const workerUsername = ticket.workerUser.username;
    const workerMessage = ticket.workerMessage[1].text;
    new Email(
      `${workerUsername} reject your ticket \n Message : ${workerMessage}`
    ).setup(); //send email if ticket send by client
    await ticket.update({
      workerId: null,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      data: newTicket,
    },
  });
});
exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByPk(req.params.id);
  await ticket.destroy();
  if (!ticket) {
    return next(new AppError("No ticket found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.timer = () => {
  // Update the count down every 1 second
  var x = setInterval(async function () {
    const ticket = await Ticket.findAll();
    // Get today's date and time
    // Time calculations for days, hours, minutes and seconds
    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // var hours = Math.floor(
    //   (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    // );
    // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    var now = new Date().getTime();
    ticket.forEach((t) => {
      // "Jan 27, 2022 14:27:25"
      var countDownDate = new Date(t.timer).getTime();
      // Find the distance between now and the count down date

      if (t.acceptedByWorker) {
        var distance = countDownDate - now;
        // If the count down is finished, write some text
        if (distance < 0 && t.emailTimerSent != true) {
          console.log(t.id);
          t.update({ emailTimerSent: 1 });
          new Email(
            `${t.workerUsername} does not finish the job yet\n 
            check your panel for more detail`
          ).setup(); //send email if ticket send by client
          //clearInterval(x);
        }
      }
    });
  }, 1000);
};
