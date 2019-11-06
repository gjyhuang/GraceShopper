const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

const CardInfo = db.define('cardInfo', {
  nameOnCard: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: ['^[a-z]+$', 'i']
    }
  },
  cardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isCreditCard: true,
      notEmpty: true
    }
  },
  billingAddressLine1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingAddressLine2: {
    type: Sequelize.STRING
  },
  billingAdressZipCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cvv: {
    type: Sequelize.INTEGER,
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt');
    }
  }
});

/**
 * classMethods
 */
CardInfo.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

CardInfo.encryptCvv = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndCvv = cardInfo => {
  if (cardInfo.changed('cvv')) {
    cardInfo.salt = CardInfo.generateSalt();
    cardInfo.cvv = CardInfo.encryptPassword(
      cardInfo.password(),
      cardInfo.salt()
    );
  }
};

CardInfo.beforeCreate(setSaltAndCvv);
CardInfo.beforeUpdate(setSaltAndCvv);
CardInfo.beforeBulkCreate(cardInfos => {
  cardInfos.forEach(setSaltAndCvv);
});

module.exports = CardInfo;
