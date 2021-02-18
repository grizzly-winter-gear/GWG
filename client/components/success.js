import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPurchasedCart } from '../store/cart';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
class Success extends Component {
  componentDidMount() {
    //this.props.fetchPurchasedCart();
  }
  render() {
    return (
      <Container>
        <p>Purchased confirmed!</p>
        <br />
        <Link to="/">
          <Button variant="contained">Return to Home</Button>
        </Link>
      </Container>
    );
  }
}

export default connect(null, (dispatch) => {
  return {
    fetchPurchasedCart: () => dispatch(fetchPurchasedCart()),
  };
})(Success);
