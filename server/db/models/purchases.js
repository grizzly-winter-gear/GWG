const Sequelize = require('sequelize');
const db = require('../db');

const Purchases = db.define('purchases', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Purchases;
