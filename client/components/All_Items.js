import React from 'react';
import { connect } from 'react-redux';
import { fetchItems, destroyItem } from '../store/allItems';
import { fetchAddItem } from '../store/cart';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class All_Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    this.props.getItems(this.props.state.allItems.index);
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

    //UPDADTE QUANTITY AMOUNT LATER (OPTION FOR QUANTITYS), FIXED TO 1//)
    const { privilege } = this.props.state.auth;
    let { catalog } = this.props.state.allItems;
    return (
      <div>
        <p>Catalog items on this page: {catalog.length}</p>
        <Button
          variant="contained"
          color="primary"
          style={styles.button}
          onClick={() => this.props.getItems(this.props.state.allItems.index)}
        >
          Next Page
        </Button>

        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          {catalog.length !== 0 ? (
            catalog.map((item, idx) => {
              return (
                <Card style={styles.card} key={idx}>
                  <CardMedia
                    style={styles.media}
                    image={item.imageURL}
                    title={item.name}
                  />
                  <Typography style={styles.type} gutterBottom variant="button">
                    <Link to={`/singleItem/${item.id}`}>{item.name}</Link>
                  </Typography>
                  <CardActions style={styles.cardActions}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      title={'Add to cart: ' + item.name}
                      onClick={() => this.addToCart(item.id)}
                    >
                      Add to Cart
                    </Button>
                    {/* {privilege === 'administrator' && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        title={'Delete ' + item.name}
                        onClick={() => this.props.destroyItem(item.id)}
                      >
                        Delete
                      </Button>
                    )} */}
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
            vertical: 'top',
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
} //end class

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItems: (index) => dispatch(fetchItems(index)),
    fetchAddItem: (userId, itemId, quantity) =>
      dispatch(fetchAddItem(userId, itemId, quantity)),
    destroyItem: (id) => dispatch(destroyItem(id)),
  };
};

export default connect(mapState, mapDispatch)(All_Items);
//connect function - will connect a react component to a redux store
