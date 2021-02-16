import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Admin from './admin_components/Admin';
import { fetchPurchases } from '../store/previousPurchases';
/**
 * COMPONENT
 */
class Account extends React.Component {
  componentDidMount() {
    this.props.fetchPurchases();
  }

  render() {
    const { account } = this.props;
    console.log(this.props.purchases);
    return (
      <div>
        <h3>
          Welcome to GWG, {account.email}. You may view your account info and
          orders here:
        </h3>
        <h3>Account details</h3>
        <a className="link-button" href = "/editprofile">Edit Profile </a>
        <ul id="account_component" className="account_component_class">
          {Object.keys(account)
            .filter((key) => key !== 'password')
            .map((key, idx) => {
              return (
                <li key={idx}>
                  {key}: {account[key]}
                </li>
              );
            })}
        </ul>
        {account.privilege === 'administrator' && <Admin />}
        Previous Purchases:
        <ul>
          {this.props.purchases.map((cart, idx) => {
            return (
              <ul className="catalog" key={idx}>
                {cart.purchases.map((item, _idx) => {
                  return (
                    <li key={`purchase_${_idx}`}>
                      <img src={item.item.imageURL} title={item.item.name} />
                      <Link to={`/singleItem/${item.item.id}`}>
                        {item.item.name}
                      </Link>
                      <span>Quantity: {item.quantity}</span>
                    </li>
                  );
                })}
              </ul>
            );
          })}
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
    account: state.auth,
    purchases: state.previousPurchases,
  };
};

export default connect(mapState, (dispatch) => {
  return {
    fetchPurchases: () => dispatch(fetchPurchases()),
  };
})(Account);
