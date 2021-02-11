import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { fetchUsers } from '../../store/users';
import PrivilegeForm from './PrivilegeForm';

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const styles = {
      Table: {
        minWidth: 650,
        height: 200,
        overflowY: 'auto',
      },
      Row: {},
      Cell: {
        width: 130,
      },
    };
    let users = this.props.state.users;
    return (
      <div>
        <TableContainer component={Paper}>
          <Table style={styles.Table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Email</TableCell>
                <TableCell align="justify">Privilege</TableCell>
                <TableCell align="right">githubId</TableCell>
                <TableCell align="right">id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell align="right">
                    {/* {user.privilege} */}
                    <PrivilegeForm id={user.id} privilege={user.privilege} />
                  </TableCell>
                  <TableCell align="right">{user.githubId}</TableCell>
                  <TableCell align="right">{user.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
} //end class

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(AdminUsers);
