const router = require('express').Router();
const {
  models: { User, Item, Cart },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    if (user.privilege === 'adminstrator') {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email', 'privilege'],
      });
      res.send(users);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/purchases', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    const purchases = await User.findOne({
      where: {
        id: user.id,
      },
      include: {
        model: Cart,
        where: { status: 'purchased' },
        include: { model: Item },
      },
    });

    res.send(purchases);

    // if (user.privilege === 'adminstrator') {
    //   const users = await User.findAll({
    //     // explicitly select only the id and email fields - even though
    //     // users' passwords are encrypted, it won't help if we just
    //     // send everything to anyone who asks!
    //     attributes: ['id', 'email', 'privilege'],
    //   });
    //   res.send(users);
    //}
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const items = await Cart.findAll({
      where: {
        userId: user.id,
        status: 'unpurchased',
      },
      include: { model: Item },
    });
    res.send(items);
  } catch (err) {
    next(err);
  }
});

router.post('/addItem', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    const cartItem = await Cart.findOne({
      where: {
        userId: user.id,
        itemId: req.body.itemId,
        status: 'unpurchased',
      },
    });
    if (!cartItem) {
      await Cart.create({
        userId: user.id,
        itemId: req.body.itemId,
        quantity: req.body.quantity,
        status: 'unpurchased',
      });
    } else {
      cartItem.quantity++;
      await cartItem.save();
    }

    const item = await Item.findOne({
      where: {
        id: req.body.itemId,
      },
    });

    res.send(item);
  } catch (err) {
    next(err);
  }
});

router.post('/deleteItem', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    await Cart.destroy({
      where: {
        userId: user.id,
        itemId: req.body.itemId,
        status: 'unpurchased',
      },
    });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put('/editQuantity', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    await Cart.update(
      {
        quantity: req.body.quantity,
      },
      {
        where: {
          userId: user.id,
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

router.put('/editPrivilege', async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findByToken(req.headers.authorization);

    if ((user.privilege = 'administrator')) {
      const user = await User.findByPk(req.body.userId);
      user.privilege = req.body.privilege;
      await user.save();
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});
