import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, fetchDeleteItem, fetchEditItem } from '../store/cart';

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
            <li key={item.itemId}>
              {item.name}, <p> description: {item.description}</p>,
              {/* {console.log(item.cart)} */}
              <p> quantity: {item.quantity}</p>
              <img
                src="/images/delete.png"
                className="delete_btn"
                title="Delete"
                onClick={() =>
                  this.props.fetchDeleteItem(this.props.userId, item.itemId)
                }
              />
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
    fetchDeleteItem: (userId, itemId) =>
      dispatch(fetchDeleteItem(userId, itemId)),
  };
};

export default connect(mapState, mapDispatch)(ViewCart);
