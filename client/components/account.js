import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { fetchEditPrivilege } from '../store/auth';
import Admin from './admin';
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
    console.log(account);
    return (
      <div>
        <h3>
          Welcome to GWG, {account.email}. You may view your account info and
          orders here
        </h3>
        <h3>Account details</h3>
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
        Previous Purchases
        <ul className="catalog">
          {this.props.purchases.map((item, idx) => {
            return (
              <li key={idx}>
                <img src={item.item.imageURL} title={item.item.name} />
                <Link to={`/singleItem/${item.item.id}`}>{item.item.name}</Link>
                <span>Quantity: {item.quantity}</span>
              </li>
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
