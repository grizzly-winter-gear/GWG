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

class ViewCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  addToCart(id) {
    this.props.fetchAddItem(this.props.state.auth.id, id, 1);
    this.setState({ open: true });
  }
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  }

  render() {
    const { privilege } = this.props.state.auth;
    const styles = {
      card: {
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          {this.props.catalog.length !== 0 ? (
            this.props.catalog.map((product, idx) => {
              return (
                <Card style={styles.card} key={idx}>
                  <CardMedia
                    style={styles.media}
                    image={product.imageURL}
                    title={product.name}
                  />
                  <Typography style={styles.type} gutterBottom variant="button">
                    <Link to={`/singleItem/${product.id}`}>{product.name}</Link>
                  </Typography>
                  <CardActions style={styles.cardActions}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      title={'Add to cart: ' + product.name}
                      onClick={() => this.addToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
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
    fetchAddItem: (userId, productId, quantity) =>
      dispatch(fetchAddItem(userId, productId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(ViewCatalog);
