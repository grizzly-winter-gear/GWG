import React from 'react';
import { connect } from 'react-redux';
import All_Items from './All_Items';
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;

  return (
    <div>
      <h3>Welcome to GWG, {email}</h3>
      <All_Items />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
