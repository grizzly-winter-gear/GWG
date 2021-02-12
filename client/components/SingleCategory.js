import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../store/singleCategory';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
class SingleCategory extends Component {
  componentDidMount() {
    // console.log(this.props.match.params.category);
    const categName = this.props.match.params.category
    this.props.fetchItems(categName);
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
    console.log("the state is ",this.props.state.singleCategory)
    return (
    <div>
      <center>
      <h1 className="category-header">{this.props.match.params.category} </h1>
      </center>

      <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
    >
      {this.props.state.singleCategory.length !== 0 ? (
        this.props.state.singleCategory.map((items, idx) => {
          return (

            <Card style={styles.card} key={idx}>
              <CardMedia
                style={styles.media}
                image={items.imageURL}
                title={items.name}
              />
              <Typography style={styles.type} gutterBottom variant="button">
                <Link to={`/singleItem/${items.id}`}>{items.name}</Link>
              </Typography>
              <CardActions style={styles.cardActions}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  title={'Add to cart: ' + items.name}
                  onClick={() => this.addToCart(items.id)}
                >
                  Add to Cart
                </Button>
                {privilege === 'administrator' && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    title={'Delete ' + items.name}
                    onClick={() => this.props.destroyItem(items.id)}
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
    </Grid>
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
    fetchItems: (category) => dispatch(fetchItems(category))
  };
};

export default connect(mapState, mapDispatch)(SingleCategory);
