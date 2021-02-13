import React from 'react';
import { connect } from 'react-redux';
import { AdminBrowser } from './AdminBrowser';

/**
 * COMPONENT
 */
class Admin extends React.Component {
  render() {
    const { account } = this.props;
    return (
      <div>
        <div className="admin_account_view">
          <h2>You are admin.</h2>
          <AdminBrowser />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    account: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Admin);
