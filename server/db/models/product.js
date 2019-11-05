const Sequelize = require('sequelize');
const db = require('../db');

// each row is a product
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  }
});

module.exports = Product;
