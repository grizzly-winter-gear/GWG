const {
  models: { User, Item, Cart },
} = require('../db');
const Purchases = require('../db/models/purchases');

const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE);

module.exports = router;

router.post('/create-checkout-session', async (req, res, next) => {
  const user = await User.findByToken(req.headers.authorization);
  let cart = await Cart.findOne({
    where: {
      userId: user.id,
      status: 'unpurchased',
    },
    include: { model: Purchases, include: { model: Item } },
  });

  const lineItems = [];
  const quantityCheck = [];

  cart.purchases.forEach((purchase) => {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: purchase.item.name,
        },
        unit_amount: purchase.item.price * 100,
      },
      quantity: purchase.quantity,
    });
    if (purchase.quantity > purchase.item.stock) {
      quantityCheck.push({
        itemId: purchase.item.id,
        name: purchase.item.name,
        stock: purchase.item.stock,
      });
    }
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.URL_CALLBACK}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`, //url callback + 'you checked successfully'
    cancel_url: process.env.URL_CALLBACK, //change to failed link
  });
  cart.sessionId = session.id;
  await cart.save();
  res.json({ id: session.id, quantityCheck: quantityCheck });
});

router.get('/success', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    //const customer = await stripe.customers.retrieve(session.customer);

    const cart = await Cart.findOne({
      where: {
        sessionId: session.id,
        status: 'unpurchased',
      },
      include: { model: Purchases },
    });

    if (cart && session.payment_status === 'paid') {
      cart.status = 'purchased';
      await cart.save();
      const items = await Promise.all(
        cart.purchases.map((purchase) =>
          Item.findOne({
            where: {
              id: purchase.itemId,
            },
          })
        )
      );
      cart.purchases.forEach((purchase, idx) => {
        items[idx].stock -= purchase.quantity;
      });
      await Promise.all(items.map((item) => item.save()));
    }

    const user = await User.findOne({
      where: {
        id: cart.userId,
      },
    });

    if (user.email && user.email !== '') {
      const send = require('gmail-send')({
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
        to: user.email,
        subject: 'GWG Order Confirmation',
        html: `<p>Your order has been confirmed</p><br/><p>Sign into <a href='https://grizzly-winter-gear.herokuapp.com/home'>Grizzly Winter Gear</a> to view your order</p>`,
      });

      await send();
    }

    // console.log(session);
    // console.log(customer);
    res.redirect('/success');
  } catch (er) {
    console.log(er);
    next(er);
  }
});
