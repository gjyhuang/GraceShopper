const router = require('express').Router();
const {OrderItem, Product} = require('../db/models/index');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allOrderItems = await OrderItem.findAll();
    res.json(allOrderItems);
  } catch (error) {
    next(error);
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const oneOrderItems = await OrderItem.findAll({
      where: {orderId: req.params.orderId}
    });
    res.json(oneOrderItems);
  } catch {
    next(error);
  }
});

router.post('/:orderId', async (req, res, next) => {
  try {
    console.log('body inside server/api/orderItems', req.body);
    const productId = req.body.productId;
    // access the product model to get the item's current price
    const {price} = await Product.findByPk(productId);
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

router.delete('/', async (req, res, next) => {
  try {
    // destroy row according to item Id in req body
    await OrderItem.destroy({where: {id: req.body.id}});
    res.status(200);
  } catch (error) {
    next(error);
  }
});
