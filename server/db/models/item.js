const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define(
  'item',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      // unique: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    imageURL: {
      type: Sequelize.STRING,
      defaultValue: './images/default-image.png',
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    rating: {
      type: Sequelize.DECIMAL(10, 1),
    },
    category: {
      type: Sequelize.TEXT,
    },
  },
  { timestamps: false }
);

module.exports = Item;
