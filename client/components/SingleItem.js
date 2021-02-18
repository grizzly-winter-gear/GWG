import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../store/singleItem';
import { fetchAddItem } from '../store/cart';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
class SingleItem extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchItem(id);
  }

  render() {
    const styles = {
      card: {
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // minWidth: 150,
        // minHeight: 200,
      },
      media: {
        height: 400,
      },
      cardActions: {
        display: 'flex',
        justifyContent: 'center',
      },
      type: {
        margin: '0.5rem',
      },
    };
    const item = this.props.state.singleItem;
    return (
      <Grid>
        <Card style={styles.card}>
          <Typography align="center" style={styles.type}>
            {item.name}: {item.price}
          </Typography>
          <Typography align="center" style={styles.type}>
            Rating {item.rating}
          </Typography>
          <CardMedia
            style={styles.media}
            image={item.imageURL}
            title={item.name}
          />

          <Typography style={styles.type} gutterBottom>
            {item.description}
          </Typography>
          <CardActions style={styles.cardActions}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              title={'Add to cart: ' + item.name}
              onClick={() =>
                this.props.fetchAddItem(
                  this.props.state.auth.id,
                  item.id,
                  1,
                  item
                )
              }
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
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
    fetchItem: (id) => dispatch(fetchItem(id)),
    fetchAddItem: (userId, itemId, quantity, item) =>
      dispatch(fetchAddItem(userId, itemId, quantity, item)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
