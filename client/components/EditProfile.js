import React from 'react';
import { connect } from 'react-redux';

export const EditProfile = (props) => {

  return (
    <div>
      <form>
        <label>Your current email is: </label>
        <label input="text">Enter new email here</label>

      </form>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // email: state.auth.email,
  };
};

export default connect(mapState)(EditProfile);
