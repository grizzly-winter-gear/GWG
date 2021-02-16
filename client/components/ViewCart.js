import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, fetchDeleteItem, fetchEditItem } from '../store/cart';
import { Link } from 'react-router-dom';
import Stripe from './stripe';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// Icons

import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Container } from '@material-ui/core';
/**
 * COMPONENT
 */
class ViewCart extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(userId, itemId, e) {
    // console.log(userId, itemId, e.target);
    this.props.fetchEditItem(userId, itemId, parseInt(e.target.value));
  }

  componentDidMount() {
    this.props.fetchCart(this.props.userId);
  }
  render() {
    const cellStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    };
    return (
      <div>
        <h3>Cart View</h3>
        <Container>
          <Paper variant="elevation" elevation={24}>
            <Table size="medium" aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.cart.map((item) => (
                  <TableRow className="cartItem" key={item.itemId}>
                    <TableCell style={cellStyle}>
                      <img
                        width="100"
                        className="itemImage"
                        title={item.item.name}
                        src={item.item.imageURL}
                      />
                      {item.item.name}
                    </TableCell>
                    <TableCell align="right">
                      {/* <span>quantity: {item.quantity}</span> */}
                      <label htmlFor="item_quantity"></label>
                      <input
                        type="number"
                        id="item_quantity"
                        name="item_quantity"
                        min="0"
                        max="100"
                        onChange={(e) =>
                          this.onChange(this.props.userId, item.itemId, e)
                        }
                        value={item.quantity}
                      ></input>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        className="delete_btn"
                        title={'Delete ' + item.item.name}
                        onClick={() =>
                          this.props.fetchDeleteItem(
                            this.props.userId,
                            item.itemId
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <center>
            <Link to="/payments">Proceed to Payments</Link>
            <Stripe />
          </center>
        </Container>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userId: state.auth.id,
    cart: state.cart,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    fetchDeleteItem: (userId, itemId) =>
      dispatch(fetchDeleteItem(userId, itemId)),
    fetchEditItem: (userId, itemId, quantity) =>
      dispatch(fetchEditItem(userId, itemId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(ViewCart);
