const Sequelize = require('sequelize');
const db = require('../db');

const Purchases = db.define('purchases', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

module.exports = Purchases;
