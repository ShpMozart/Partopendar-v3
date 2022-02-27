const Sequelize = require("sequelize");
const db = require("../db/database");

const FaultWorkerFile = db.define("faultWorkerFile", {
  faultWorkerId: {
    type: Sequelize.INTEGER,
  },
  from: {
    type: Sequelize.STRING,
  },
  faultFileAddress: {
    type: Sequelize.STRING,
  },
});

module.exports = FaultWorkerFile;
