import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../store/singleItem';
import { fetchAddItem } from '../store/cart';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const Stripe_Publishable_Key =
  'pk_test_51IIkWkKeRKIJY4WC39oRsOkkq1KnvUKMqUR85SfUbKdifuDN3XqsGsUs2wIxApF9sr6ZdggRIIkb0pviH62g2dN000huT4rH5A';

//pass in the publishable key below; dont call loadStripe within the render method of the component
const stripePromise = loadStripe(Stripe_Publishable_Key);

//style card element here!
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
    },
  },
};

class paymentPage extends Component {
  handleClick() {
    console.log('testing this event handler on the payments page!');
    //invoke axios call here to change backend data
  }

  async handleFormSubmit() {
    const { data: clientSecret } = await axios.post(
      '/api/payments/paymentRequest',
      {
        price: 100,
      }
    );
  }

  render() {
    return (
      <Elements stripe={stripePromise}>
        <div>
          {/* <p>Testing Payments Page</p> */}

          <CardElement options={cardElementOptions} />

          <Link to="/checkout" onClick={this.handleClick}>
            Proceed to checkout
          </Link>

        </div>
      </Elements>
    );
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchItem: (id) => dispatch(fetchItem(id)),
    fetchAddItem: (userId, itemId, quantity) =>
      dispatch(fetchAddItem(userId, itemId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(paymentPage);
