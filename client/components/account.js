import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Admin from './admin_components/Admin';
import { fetchPurchases } from '../store/previousPurchases';
import PastPurchases from './PastPurchases';
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
        Previous Purchases
        <PastPurchases />
        {account.privilege === 'administrator' && <Admin />}
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
