const Sequelize = require('sequelize');
const db = require('../db');

const ShippingAddress = db.define('shippingAddress', {
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  addressLine2: {
    type: Sequelize.STRING
  },
  adressZipCode: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = ShippingAddress;
