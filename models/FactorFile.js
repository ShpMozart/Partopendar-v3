const Sequelize = require("sequelize");
const db = require("../db/database");

const FactorFile = db.define("factorFile", {
  senderId: {
    type: Sequelize.INTEGER,
  },

  fileAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = FactorFile;
