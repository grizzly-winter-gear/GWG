import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const ViewCart = (props) => {
  const { state } = props;
  console.log(state);
  return (
    <div>
      <h3>Cart View below</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    state,
  };
};

export default connect(mapState)(ViewCart);
