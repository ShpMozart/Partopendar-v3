const Sequelize = require("sequelize");
const db = require("../db/database");

const WorkerMessage = db.define("workerMessage", {
  ticketId: {
    type: Sequelize.INTEGER,
  },
  from: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
});

module.exports = WorkerMessage;
