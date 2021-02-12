const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE);

module.exports = router;

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt', //replace with our product data
          },
          unit_amount: 2000, //replace with dolar armound
        },
        quantity: 1, //quantity
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:8080/success', //url callback + 'you checked successfully'
    cancel_url: 'http://localhost:8080', //change to failed link
  });

  res.json({ id: session.id });
});
