import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { loadStripe } from '@stripe/stripe-js';

const Stripe_Publishable_Key =
  'pk_test_51IIkWkKeRKIJY4WC39oRsOkkq1KnvUKMqUR85SfUbKdifuDN3XqsGsUs2wIxApF9sr6ZdggRIIkb0pviH62g2dN000huT4rH5A';

const stripePromise = loadStripe(Stripe_Publishable_Key);

class Stripe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Quantity: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick(event) {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    // const response = await fetch('/create-checkout-session', {
    //   method: 'POST',
    // });

    const token = window.localStorage.getItem('token');
    const session = (
      await axios.post(
        '/api/stripe/create-checkout-session',
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
    ).data;

    // const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    if (session.quantityCheck.length === 0) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result.error);
      }
    } else {
      // console.log(session.quantityCheck);
      this.setState({
        Quantity: session.quantityCheck,
      });
    }
  }

  render() {
    console.log(this.state.Quantity);
    return (
      <Grid>
        <button role="link" onClick={() => this.handleClick()}>
          Checkout
        </button>
        {this.state.Quantity.length > 0 && (
          <Grid item>
            There's a problem with this purchase:{' '}
            {this.state.Quantity.map((item) => (
              <Grid item key={item.itemId}>
                {item.name} only has {item.stock} left in stock
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    );
  }
}

export default Stripe;
