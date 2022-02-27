const Sequelize = require("sequelize");
const db = require("../db/database");

const WorkerFile = db.define("workerFile", {
  workerId: {
    type: Sequelize.INTEGER,
  },
  from: {
    type: Sequelize.STRING,
  },
  fileAddress: {
    type: Sequelize.STRING,
  },
});

module.exports = WorkerFile;
