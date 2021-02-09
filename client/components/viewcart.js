import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, fetchDeleteItem, fetchEditItem } from '../store/cart';
import { Link } from 'react-router-dom';
/**
 * COMPONENT
 */
class ViewCart extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(userId, itemId, e) {
    console.log(userId, itemId, e.target);
    this.props.fetchEditItem(userId, itemId, parseInt(e.target.value));
  }

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
            <li className="cartItem" key={item.itemId}>
              <img
                className="itemImage"
                title={item.item.name}
                src={item.item.imageURL}
              />

              <h4> {item.item.name}</h4>
              <p>
                <br />
                {item.item.description}
              </p>
              <p>
                <span>quantity: {item.quantity}</span>
                <label htmlFor="item_quantity"></label>
                <input
                  type="number"
                  id="item_quantity"
                  name="item_quantity"
                  min="0"
                  max="100"
                  onChange={(e) =>
                    this.onChange(this.props.userId, item.itemId, e)
                  }
                  value={item.quantity}
                ></input>
              </p>
              <img
                src="/images/delete.png"
                className="delete_btn"
                title={'Delete ' + item.item.name}
                onClick={() =>
                  this.props.fetchDeleteItem(this.props.userId, item.itemId)
                }
              />
            </li>
          ))}
        </ul>
        <Link to="/payments">Proceed to Payments</Link>
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
    fetchEditItem: (userId, itemId, quantity) =>
      dispatch(fetchEditItem(userId, itemId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(ViewCart);
