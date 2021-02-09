import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../store/singleItem';
import { fetchAddItem } from '../store/cart';
import { Link } from 'react-router-dom';

class paymentPage extends Component {
  handleClick() {
    console.log("testing this event handler on the payments page!")
    //invoke axios call here to change backend data

  }

  render() {
    return (
      <div>
        <p>Testing Payments Page</p>
        <Link to="/checkout" onClick={this.handleClick}>Proceed to checkout</Link>
      </div>

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
