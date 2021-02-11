import React from 'react';
import { connect } from 'react-redux';
import { fetchItems, destroyItem } from '../../store/allItems';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AdminCreateItemForm from './AdminCreateItemForm';

class AdminItems extends React.Component {
  componentDidMount() {
    this.props.getItems(this.props.state.allItems.index);
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
    let { catalog } = this.props.state.allItems;
    return (
      <div>
        <AdminCreateItemForm />
        <Box spacing={0} direction="row" alignItems="center" justify="center">
          {catalog.length !== 0
            ? catalog.map((item, idx) => {
                return (
                  <Card style={styles.card} key={idx}>
                    <Typography
                      style={styles.type}
                      gutterBottom
                      variant="button"
                    >
                      {item.name}
                    </Typography>
                    <CardActions style={styles.cardActions}>
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
            : 'No Items To Display'}
        </Box>
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

const mapDispatch = (dispatch) => {
  return {
    getItems: (index) => dispatch(fetchItems(index)),
    destroyItem: (id) => dispatch(destroyItem(id)),
  };
};

export default connect(mapState, mapDispatch)(AdminItems);
