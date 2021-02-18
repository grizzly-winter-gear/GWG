import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPurchasedCart } from '../store/cart';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
class Success extends Component {
  componentDidMount() {
    //this.props.fetchPurchasedCart();
  }
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <p>Purchased confirmed!</p>
        <br />
        <Link to="/singlecategory/All/0">
          <Button variant="contained">Return to Catalog</Button>
        </Link>
      </Grid>
    );
  }
}

export default connect(null, (dispatch) => {
  return {
    fetchPurchasedCart: () => dispatch(fetchPurchasedCart()),
  };
})(Success);
