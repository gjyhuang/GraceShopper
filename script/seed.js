const db = require('../server/db');
const {User, Product} = require('../server/db/models/index');

const products = [
  {
    name: 'Excalibur',
    price: 500000,
    imageUrl:
      'https://www.darksword-armory.com/wp-content/uploads/2014/09/the-excalibur-sword-medieval-weapon-1524.jpg',
    amountInStock: 1
  },
  {
    name: 'Murasame',
    price: 300000,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51arm224w%2BL._SX425_.jpg',
    amountInStock: 1
  },
  {
    name: 'Master Sword',
    price: 500000,
    imageUrl:
      'https://images.fun.com/products/61032/1-1/legend-of-zelda-master-sword-light.jpg',
    amountInStock: 1
  },
  {
    name: 'Ragnell',
    price: 700000,
    imageUrl:
      'https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/34a10962ba762a663a2e5734d217e2e2/large.jpg',
    amountInStock: 1
  }
];

const users = [
  {
    firstName: 'Lancelot',
    lastName: 'duLac',
    email: 'lance@roundtable.com',
    password: 'guineviere1234',
    salt: 'temp',
    googleId: null
  },
  {
    firstName: 'Arthur',
    lastName: 'Pendragon',
    email: 'excalibur@roundtable.com',
    password: 'ika1234',
    salt: 'temp',
    googleId: null
  },
  {
    firstName: 'Link',
    lastName: 'Link',
    email: 'LL@roundtable.com',
    password: 'Fairy1234',
    salt: 'temp',
    googleId: null
  },
  {
    firstName: 'Ike',
    lastName: 'Ike',
    email: 'dragonmaster@roundtable.com',
    password: 'fire1234',
    salt: 'temp',
    googleId: null
  }
];

const seed = async () => {
  await db.sync({force: true});

  // seed your database here!

  await Promise.all(
    users.map(user => {
      return User.create(user);
    })
  );

  await Promise.all(
    products.map(product => {
      return Product.create(product);
    })
  );

  console.log('Seeding success!');
  db.close();
};

seed().catch(err => {
  console.error('Oh noes! Something went wrong!');
  console.error(err);
  db.close();
});
