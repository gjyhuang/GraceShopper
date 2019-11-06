const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['in cart', 'processing', 'in transit', 'delivered']]
    }
  },
  discountCode: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.INTEGER
  }
});

module.exports = Order;
