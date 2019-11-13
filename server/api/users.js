const router = require('express').Router();
const {User, Order} = require('../db/models/index');

module.exports = router;

// creating a separate file for user's cart routes - redirect to that file if user is trying to get their cart
// router.use('/users', require('./users'));
// router.use('/:id/cart/', require('./cart'));

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/profile', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      res.status(401).send('Unauthorized');
    } else {
      const userId = req.session.passport.user;
      const userData = await User.findByPk(userId);
      res.json(userData);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put('/profile', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      res.status(401).send('Unauthorized');
    } else {
      const userId = req.session.passport.user;
      const updateProfileData = req.body;
      await User.update(updateProfileData, {
        where: {
          id: userId
        }
      });
      const userData = await User.findByPk(userId);
      res.json(userData);
    }
  } catch (error) {
    next(error);
  }
});
