import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Account = (props) => {
  const { account } = props;
  console.log(account);
  return (
    <div>
      <h3>
        Welcome to GWG, {account.email}. You may view your account info and
        purchases here
      </h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapState)(Account);
