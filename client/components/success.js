import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPurchasedCart } from '../store/cart';
import { Link } from 'react-router-dom';

class Success extends Component {
  componentDidMount() {
    this.props.fetchPurchasedCart();
  }
  render() {
    return (
      <div>
        <p>Purchased confirmed!</p>
        <br />
        <Link to="/">
          <button>Return to Home</button>
        </Link>
      </div>
    );
  }
}

export default connect(null, (dispatch) => {
  return {
    fetchPurchasedCart: () => dispatch(fetchPurchasedCart()),
  };
})(Success);
