import React, { Component } from 'react';
import axios from 'axios';

import { loadStripe } from '@stripe/stripe-js';

const Stripe_Publishable_Key =
  'pk_test_51IIkWkKeRKIJY4WC39oRsOkkq1KnvUKMqUR85SfUbKdifuDN3XqsGsUs2wIxApF9sr6ZdggRIIkb0pviH62g2dN000huT4rH5A';

const stripePromise = loadStripe(Stripe_Publishable_Key);

class Stripe extends Component {
  constructor(props) {
    super(props);
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
      console.log(session.quantityCheck);
    }
  }

  render() {
    return (
      <button role="link" onClick={() => this.handleClick()}>
        Checkout
      </button>
    );
  }
}

export default Stripe;
