const router = require('express').Router();
const {
  models: { User, Cart },
} = require('../db');
const Purchases = require('../db/models/purchases');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

//github callback if using github OAUTH
router.get('/github/callback', async (req, res, next) => {
  //User.authenticateGithub will attempt to use code to find a user in our system.
  //if successful, a jwt token will be returned
  //that token will be set in localStorage
  //and client will redirect to home page

  try {
    res.send(
      `
      <html>
      <body>
        <script>
        window.localStorage.setItem('token', '${await User.authenticateGithub(
          req.query.code
        )}');
        window.document.location = '/singlecategory/All/0';
        </script>
      </body>
      </html>
      `
    );
  } catch (ex) {
    next(ex);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    if (req.body.cart) {
      const cart = await Cart.create({
        userId: user.id,
        status: 'unpurchased',
      });

      await Promise.all(
        req.body.cart.map((el) =>
          Purchases.create({
            quantity: el.quantity,
            itemId: el.itemId,
            cartId: cart.id,
          })
        )
      );
    }

    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    if (user) {
      const cart = await Cart.findOne({
        where: {
          userId: user.id,
          status: 'unpurchased',
        },
      });

      if (req.body.cart && !cart) {
        const cart = await Cart.create({
          userId: user.id,
          status: 'unpurchased',
        });

        await Promise.all(
          req.body.cart.map((el) =>
            Purchases.create({
              quantity: el.quantity,
              itemId: el.itemId,
              cartId: cart.id,
            })
          )
        );
      }
    }

    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
