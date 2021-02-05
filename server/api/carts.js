const router = require('express').Router();
const {
  models: { Cart, Item },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.send(await Cart.findAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log('seeking to find carts of userId: ', userId);
    const carts = await Cart.findAll({
      where: {
        userId,
        // status: 'unpurchased',
      },
    });
    console.log(carts);
    res.send(carts);
  } catch (err) {
    next(err);
  }
});

router.post('/addItem', async (req, res, next) => {
  try {
    // let cart = await Cart.create(req.body);
    // res.send(cart);
  } catch (ex) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    // let id = req.params.id;
  } catch (ex) {
    next(ex);
  }
});

// router.delete();
