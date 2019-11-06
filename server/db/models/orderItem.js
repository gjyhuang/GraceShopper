const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  // product ID column
  orderId: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  // order ID column
  productId: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  // quantity column
  quantity: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = OrderItem;
