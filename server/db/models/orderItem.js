const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  // product ID column
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // order ID column
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // quantity column
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = OrderItem;
