const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  itemId: {
    type: Sequelize.TEXT,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.ENUM('unpurchased', 'purchased'),
  },
});

module.exports = Cart;
