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
    success_url: `http://localhost:8080/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`, //url callback + 'you checked successfully'
    cancel_url: 'http://localhost:8080', //change to failed link
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
    });

    if (cart && session.payment_status === 'paid') {
      cart.status = 'purchased';
      await cart.save();
    }

    // console.log(session);
    // console.log(customer);
    res.redirect('/success');
  } catch (er) {
    console.log(er);
    next(er);
  }
});
