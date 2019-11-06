const router = require('express').Router();
const {Product} = require('../db/models/index');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allProduct = await Product.findAll();
    res.json(allProduct);
  } catch (err) {
    next(err);
  }
});
