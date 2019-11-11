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

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
