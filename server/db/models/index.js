const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const CardInfo = require('./cardInfo');
const ShippingAddress = require('./shippingAddress');
const OrderItem = require('./orderItem');
/**
 * Model associations
 */

// each user can have more than one payment method
User.hasMany(CardInfo);
CardInfo.belongsTo(User);

// each user can have more than one shipping address
User.hasMany(ShippingAddress);
ShippingAddress.belongsTo(User);

// every user can have more than one order (only one can be pending, but others can be in different states) - should we have a shopping cart as a second model?
User.hasMany(Order);
Order.belongsTo(User);

// create associations with the orderItem - for Order table and for Product table
OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Product,
  CardInfo,
  ShippingAddress
};
