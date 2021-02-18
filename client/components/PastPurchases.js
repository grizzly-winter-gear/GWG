import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Stripe from './stripe';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// Icons

import { fetchPurchases } from '../store/previousPurchases';

import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Container } from '@material-ui/core';
/**
 * COMPONENT
 */
class PastPurchases extends React.Component {
  componentDidMount() {
    this.props.fetchPurchases();
  }
  render() {
    const cellStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    };
    const { purchases } = this.props;
    console.log(purchases);
    if (purchases.length > 0) {
      return (
        <div>
          <h3>Previous Purchases</h3>
          <Container>
            <Paper variant="elevation" elevation={24}>
              <Table size="medium" aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {purchases.length > 0 &&
                    purchases.map((purchase) =>
                      purchase.purchases.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell style={cellStyle}>
                            <img
                              width="100"
                              className="itemImage"
                              title={item.item.name}
                              src={item.item.imageURL}
                            />
                            {item.item.name}
                          </TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                        </TableRow>
                      ))
                    )}
                </TableBody>
              </Table>
            </Paper>
          </Container>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    account: state.auth,
    purchases: state.previousPurchases,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPurchases: () => dispatch(fetchPurchases()),
  };
};

export default connect(mapState, mapDispatch)(PastPurchases);
