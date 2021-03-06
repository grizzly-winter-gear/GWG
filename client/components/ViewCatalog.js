import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAddItem } from '../store/cart';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

class ViewCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  addToCart(id, product) {
    this.props.fetchAddItem(this.props.state.auth.id, id, 1, product);
    this.setState({ open: true });
  }
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  }

  render() {
    const styles = {
      card: {
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 150,
        minHeight: 200,
      },
      media: {
        height: 150,
      },
      cardActions: {
        display: 'flex',
        justifyContent: 'center',
      },
      type: {
        margin: '0.5rem',
      },
    };
    return (
      <div>
        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="center"
          justify="center"
        >
          {this.props.catalog.list.length !== 0 ? (
            this.props.catalog.list.map((product, idx) => {
              return (
                <Grid item lg={2} md={3} sm={4} xs={12} key={idx}>
                  <Card style={styles.card}>
                    <Link to={`/singleItem/${product.id}`}>
                      <CardMedia
                        style={styles.media}
                        image={product.imageURL}
                        title={product.name}
                      />
                      <Typography
                        style={styles.type}
                        gutterBottom
                        variant="button"
                      >
                        {product.name}
                      </Typography>
                    </Link>
                    <CardActions style={styles.cardActions}>
                      <Button
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        color="primary"
                        size="small"
                        title={'Add to cart: ' + product.name}
                        onClick={() => this.addToCart(product.id, product)}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ); //close return
            }) //close map
          ) : (
            <p>No Items To Display</p>
          )}
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={500}
          onClose={this.handleClose}
          message="Added to cart"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAddItem: (userId, productId, quantity, product) =>
      dispatch(fetchAddItem(userId, productId, quantity, product)),
  };
};

export default connect(mapState, mapDispatch)(ViewCatalog);
