const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: Sequelize.ENUM('unpurchased', 'purchased'),
  },
  sessionId: {
    type: Sequelize.STRING,
  },
});

module.exports = Cart;
