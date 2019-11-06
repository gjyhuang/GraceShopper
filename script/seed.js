const {db} = require('../server/db');
const {green, red} = require('chalk');
const {User} = require('../server/db/models/index');

const product = [
  {
    firstName: 'Excalibur',
    imageUrl:
      'https://www.darksword-armory.com/wp-content/uploads/2014/09/the-excalibur-sword-medieval-weapon-1524.jpg',
    description: 'Its a sword'
  },
  {
    firstName: 'Murasame',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51arm224w%2BL._SX425_.jpg',
    description: 'Its a sword'
  },
  {
    name: 'Master Sword',
    imageUrl:
      'https://www.darksword-armory.com/wp-content/uploads/2014/09/the-excalibur-sword-medieval-weapon-1524.jpg',
    description: 'Its a sword'
  },
  {
    name: 'Ragnell',
    imageUrl:
      'https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/34a10962ba762a663a2e5734d217e2e2/large.jpg',
    description: 'Its a sword'
  }
];

const users = [
  {
    firstName: 'Lancelot',
    lastName: 'du Lac',
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
    users.map(id => {
      return User.create(id);
    })
  );
  console.log(green('Seeding success!'));
  db.close();
};

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'));
  console.error(err);
  db.close();
});
