import React from 'react';
import { connect } from 'react-redux';
import { fetchEditPrivilege } from '../store/auth';
import AdminItems from './AdminItems';
import AdminUsers from './AdminUsers';
import SimpleTabs from './SimpleTabs';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
