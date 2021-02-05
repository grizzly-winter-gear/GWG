import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';
/**
 * COMPONENT
 */
class ViewCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
  }
  render() {
    const { state } = this.props;
    console.log(state);
    return (
      <div>
        <h3>Cart View below</h3>
        <p>Test to see that branch works</p>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    state,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(ViewCart);
