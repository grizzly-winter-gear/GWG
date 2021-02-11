const router = require('express').Router();
const {
  models: { User, Item, Cart },
} = require('../db');
const Purchases = require('../db/models/purchases');
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

//Broken route: Sequelize Eager Loading Error: cart is not associated to a user!
router.get('/purchases', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    const carts = await Cart.findAll({
      where: {
        userId: user.id,
        status: 'purchased',
      },
      include: {
        model: Purchases,
        include: { model: Item },
      },
    });

    // const purchases = await User.findOne({
    //   where: {
    //     id: user.id,
    //   },
    //   include: {
    //     model: Cart,
    //     where: { status: 'purchased' },
    //     include: { model: Item },
    //   },
    // });
    res.send(carts);
  } catch (err) {
    next(err);
  }
});

//Fixed
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let cart = await Cart.findOne({
      where: {
        userId: user.id,
        status: 'unpurchased',
      },
      include: { model: Purchases, include: { model: Item } },
    });
    if (!cart) {
      cart = [];
    }
    res.send(cart.purchases);
  } catch (err) {
    next(err);
  }
});

//Not sure if we need to return purchase or not, I don't think it's used....
router.post('/addItem', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    let cart = await Cart.findOne({
      where: {
        userId: user.id,
        status: 'unpurchased',
      },
    });
    if (!cart) {
      cart = await Cart.create({
        userId: user.id,
        status: 'unpurchased',
      });
    }

    const item = await Item.findOne({
      where: {
        id: req.body.itemId,
      },
    });

    let purchase = await Purchases.findOne({
      where: {
        cartId: cart.id,
        itemId: item.id,
      },
    });

    if (!purchase) {
      purchase = await Purchases.create({
        cartId: cart.id,
        itemId: item.id,
      });
    }

    purchase.quantity++;
    await purchase.save();

    purchase = await Purchases.findOne({
      where: {
        cartId: cart.id,
        itemId: item.id,
      },
      include: {
        model: Item,
      },
    });

    res.send(purchase);
  } catch (err) {
    next(err);
  }
});

//Fixed
router.post('/deleteItem', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        status: 'unpurchased',
      },
    });

    await Purchases.destroy({
      where: {
        cartId: cart.id,
        itemId: req.body.itemId,
      },
    });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

//Fixed
router.put('/editQuantity', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        status: 'unpurchased',
      },
    });

    await Purchases.update(
      {
        quantity: req.body.quantity,
      },
      {
        where: {
          cartId: cart.id,
          itemId: req.body.itemId,
        },
      }
    );

    res.send(201);
  } catch (err) {
    next(err);
  }
});

//working.
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
