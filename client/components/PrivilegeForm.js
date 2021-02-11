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
class PrivilegeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.privilege || 'administrator' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log('submitting');
    this.props.fetchEditPrivilege(this.props.account.id, this.state.value);
    event.preventDefault();
  }
  render() {
    const { account } = this.props;
    return (
      <div className="admin_account_view">
        <FormControl>
          <InputLabel shrink id="Privilege">
            Privilege
          </InputLabel>
          <Select
            labelId="Privilege-Select"
            id="Privilege-Select"
            value={this.state.value}
            onChange={this.handleChange}
            displayEmpty
          >
            <MenuItem value={'customer'}>
              <em>Customer</em>
            </MenuItem>
            <MenuItem value={'engineer'}>Engineer</MenuItem>
            <MenuItem value={'administrator'}>Administrator</MenuItem>
          </Select>
          <FormHelperText>Set Privilege</FormHelperText>
          <Button onClick={this.handleSubmit}>Submit </Button>
        </FormControl>
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
  return {
    fetchEditPrivilege: (userId, privilege) =>
      dispatch(fetchEditPrivilege(userId, privilege)),
  };
};

export default connect(mapState, mapDispatch)(PrivilegeForm);
