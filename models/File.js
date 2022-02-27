const Sequelize = require("sequelize");
const db = require("../db/database");

const File = db.define("file", {
  senderId: {
    type: Sequelize.INTEGER,
  },
  from: {
    type: Sequelize.STRING,
  },
  fileAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = File;
