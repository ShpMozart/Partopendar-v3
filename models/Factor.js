const Sequelize = require("sequelize");
const db = require("../db/database");

const Factor = db.define("factor", {
  ticketId: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  tedad: {
    type: Sequelize.INTEGER,
  },
  vahed: {
    type: Sequelize.STRING,
  },
  gheymatVahed: {
    type: Sequelize.STRING,
  },
  mablaghKol: {
    type: Sequelize.STRING,
  },
  maliat: {
    type: Sequelize.STRING,
  },
  jameKol: {
    type: Sequelize.STRING,
  },
});

module.exports = Factor;
