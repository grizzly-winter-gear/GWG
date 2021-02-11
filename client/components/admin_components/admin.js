import React from 'react';
import { connect } from 'react-redux';
import AdminItems from './AdminItems';
import AdminUsers from './AdminUsers';
import SimpleTabs from './SimpleTabs';

/**
 * COMPONENT
 */
class Admin extends React.Component {
  render() {
    const { account } = this.props;
    return (
      <div>
        <div className="admin_account_view">
          <p>You are admin. list of users</p>
          <AdminUsers />
          <AdminItems />
          {/* <SimpleTabs /> */}
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
