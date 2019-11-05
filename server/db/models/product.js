const Sequelize = require('sequelize');
const db = require('../db');

// each row is a product
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.NUMBER
  },
  imageUrl: {
    type: Sequelize.STRING
  }
});

module.exports = Product;
