const router = require('express').Router();
const {OrderItem, Product} = require('../db/models/index');

module.exports = router;

router.post('/:orderId', async (req, res, next) => {
  try {
    const productId = req.body;
    // access the product model to get the item's current price
    const price = await Product.findByPk(productId, {
      attributes: ['price']
    });
    const newOrderItem = await OrderItem.create({
      orderId: req.params.orderId,
      productId,
      price
    });
    res.json(newOrderItem);
  } catch (error) {
    next(error);
  }
});
