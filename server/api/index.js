const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/items', require('./items'));
router.use('/carts', require('./carts'));
// router.use('/payments', require('./payments'));
router.use('/stripe', require('./stripe'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
