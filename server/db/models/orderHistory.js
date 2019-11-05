const Sequelize = require('sequelize');
const db = require('../db');

const OrderHistory = db.define('orderHistory', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['processing', 'in transit', 'delivered']]
    }
  }
});

module.exports = OrderHistory;
