const router = require('express').Router();
const {
  models: { User, Item, Cart },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const items = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: { model: Item, through: { status: 'unpurchased' } },
    });
    res.send(items);
  } catch (err) {
    next(err);
  }
});

router.post('/addItem', async (req, res, next) => {
  try {
    const item = await Item.findOne({
      where: {
        id: req.body.itemId,
      },
    });

    await Cart.create({
      userId: req.body.userId,
      itemId: req.body.itemId,
      quantity: req.body.quantity,
      status: 'unpurchased',
    });

    res.send(item);
  } catch (err) {
    next(err);
  }
});

router.post('/deleteItem', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.body.userId,
        itemId: req.body.itemId,
        status: 'unpurchased',
      },
    });

    res.send(201);
  } catch (err) {
    next(err);
  }
});

router.put('/editQuantity', async (req, res, next) => {
  try {
    await Cart.update(
      {
        quantity: req.body.quantity,
      },
      {
        where: {
          userId: req.body.userId,
          itemId: req.body.itemId,
          status: 'unpurchased',
        },
      }
    );

    res.send(201);
  } catch (err) {
    next(err);
  }
});
