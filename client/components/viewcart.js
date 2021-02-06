import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';
/**
 * COMPONENT
 */
class ViewCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.userId);
  }
  render() {
    console.log(this.props.cart);
    return (
      <div>
        <h3>Cart View</h3>
        <ul className="cart">
          {this.props.cart.map((item) => (
            <li key={item.id}>
              {item.name}, <p> description: {item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userId: state.auth.id,
    cart: state.cart,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapState, mapDispatch)(ViewCart);
