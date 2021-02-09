const router = require('express').Router();

// const {
//   models: { Item },
// } = require('../db');

module.exports = router;

router.post('/paymentRequest', async (req, res, next) => {
  try {
    const paymentPrice = req.body.price;
    res.send()

  } catch (err) {
    next(err);
  }
});
