import React from 'react';
import { connect } from 'react-redux';
import { fetchEditPrivilege } from '../store/auth';
import Admin from './admin';
/**
 * COMPONENT
 */
class Account extends React.Component {
  render() {
    const { account } = this.props;
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
  };
};

export default connect(mapState)(Account);
