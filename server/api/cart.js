const router = require('express').Router();

// EV: question to ask - I'm assuming that req.params refers to the URL in the browser, not the one routed to here. I.e., can I access req.params.id from here?

router.get('/', async (req, res, next) => {
  try {
    // req.body should include the orderId. go to the orderItem model and res.send items associated wiht that order Id.
  } catch (error) {
    console.error(error);
  }
});
