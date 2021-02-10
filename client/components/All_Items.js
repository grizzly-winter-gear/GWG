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
import Box from '@material-ui/core/Box';

class All_Items extends React.Component {
  componentDidMount() {
    this.props.getItems(this.props.state.allItems.index);
  }

  render() {
    const styles = {
      root: {
        maxWidth: 345,
      },
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
        <div className="divider" />
        <div className="dropdown">
          <button className="dropbtn">Select a category</button>
          <div className="dropdown-content">
            <a href="/account ">Category 1</a>
            <a href="/account">Category 2</a>
            <a href="/account">Category 3</a>
          </div>
        </div>
        {privilege === 'administrator' && <h4>You have admin control</h4>}
        <Box className="catalog">
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
                      onClick={() =>
                        this.props.fetchAddItem(
                          this.props.state.auth.id,
                          item.id,
                          1
                        )
                      }
                    >
                      Add to Cart
                    </Button>
                    {privilege === 'administrator' && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        title={'Delete ' + item.name}
                        onClick={() => this.props.destroyItem(item.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ); //close return
            }) //close map
          ) : (
            <p>No Items To Display</p>
          )}
        </Box>
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
