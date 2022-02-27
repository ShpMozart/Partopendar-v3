const Sequelize = require("sequelize");
const db = require("../db/database");

const Ticket = db.define("ticket", {
  senderId: {
    type: Sequelize.INTEGER,
  },
  workerId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  faultWorkerId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  senderName: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  center: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  fileId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  workerFileId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  faultWorkerFileId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  factorFileId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM(["pending", "proccessing", "done"]),
    defaultValue: "pending",
  },
  signedByClient: {
    type: Sequelize.BOOLEAN,
  },
  acceptedByWorker: {
    type: Sequelize.BOOLEAN,
  },
  faultAcceptedByWorker: {
    type: Sequelize.BOOLEAN,
  },
  ticketSigning: {
    type: Sequelize.ENUM(["notFinished", "workerFinished", "bossFinished"]), //if bossFinished , status = done
    defaultValue: "notFinished",
  },
  timer: {
    type: Sequelize.STRING,
  },
  emailTimerSent: {
    type: Sequelize.BOOLEAN,
  },
});
module.exports = Ticket;
