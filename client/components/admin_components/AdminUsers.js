import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { fetchUsers } from '../../store/users';

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    console.log(this.props);
  }
  render() {
    const styles = {
      card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
    let users = this.props.state.usersReducer;
    return (
      <div>
        {/* <Box direction="row" alignItems="center" justify="center">
          {users.length !== 0 ? (
            users.map((user, idx) => {
              return (
                <Card style={styles.card} key={idx}>
                  <Typography style={styles.type} gutterBottom variant="button">
                    {user.name}
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
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      title={'Delete ' + item.name}
                      onClick={() => this.props.destroyItem(item.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ); //close return
            }) //close map
          ) : (
            <h3>No Items To Display</h3>
          )}
        </Box> */}
        {/* <Snackbar
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
        /> */}
      </div>
    );
  }
} //end class

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = {
  fetchUsers,
};

export default connect(mapState, mapDispatch)(AdminUsers);
