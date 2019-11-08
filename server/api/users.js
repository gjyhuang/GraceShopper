const router = require('express').Router();
const {User} = require('../db/models/index');

module.exports = router;

// creating a separate file for user's cart routes - redirect to that file if user is trying to get their cart
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

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'firstName', 'lastName', 'email']
    });

    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404).end();
    }
  } catch (err) {
    next(err);
  }
});
