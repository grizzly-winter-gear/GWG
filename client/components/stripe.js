import React, { Component } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Stripe_Publishable_Key =
  'pk_test_51IIkWkKeRKIJY4WC39oRsOkkq1KnvUKMqUR85SfUbKdifuDN3XqsGsUs2wIxApF9sr6ZdggRIIkb0pviH62g2dN000huT4rH5A';

const stripePromise = loadStripe(Stripe_Publishable_Key);

class Stripe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Quantity: [],
      dialog: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose(event) {
    this.setState({ dialog: false });
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
        dialog: true,
      });
    }
  }

  render() {
    return (
      <Grid>
        <button role="link" onClick={this.handleClick}>
          Checkout
        </button>
        {/* {this.state.Quantity.length > 0 && (
          <Grid item>
            There's a problem with this purchase:{' '}
            {this.state.Quantity.map((item) => (
              <Grid item key={item.itemId}>
                {item.name} only has {item.stock} left in stock
              </Grid>
            ))}
          </Grid>
        )} */}
        <Dialog
          open={this.state.dialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
        >
          <DialogTitle>{'Out of Stock'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              There's a problem with this purchase:{' '}
              {this.state.Quantity.map((item) => (
                <span key={item.itemId}>
                  <br />
                  <b>{item.name}</b> only has <b> {item.stock}</b> left in
                  stock.
                  <br />
                </span>
              ))}
              Please adjust your cart quantities before checking out.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default Stripe;
