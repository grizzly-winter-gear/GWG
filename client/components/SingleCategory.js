import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../store/singleCategory';
import Container from '@material-ui/core/Container';
import ViewCatalog from './ViewCatalog';
import Button from '@material-ui/core/Button';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
class SingleCategory extends Component {
  componentDidMount() {
    const categName = this.props.match.params.category;
    const offset = this.props.match.params.offset;
    this.props.fetchItems(categName, offset, this.props.history);
  }

  render() {
    const categName = this.props.match.params.category;
    const offset = parseInt(this.props.match.params.offset);
    const styles = {
      button: {
        // height: '30px',
      },
    };
    return (
      <div>
        <center>
          <h1 className="category-header">
            {this.props.match.params.category}
          </h1>
          <div id="pagination">
            <Button
              variant="contained"
              color="primary"
              style={styles.button}
              startIcon={<SkipPreviousIcon />}
              onClick={() =>
                this.props.fetchItems(
                  categName,
                  offset - 10 < 0 ? 0 : offset - 10,
                  this.props.history
                )
              }
            >
              Previous Page
            </Button>
            <h4>
              Displaying: {offset + 1} to {offset + 10}
            </h4>
            <Button
              variant="contained"
              color="primary"
              style={styles.button}
              endIcon={<SkipNextIcon />}
              onClick={() =>
                this.props.fetchItems(
                  categName,
                  offset + 10,
                  this.props.history
                )
              }
            >
              Next Page
            </Button>
          </div>
        </center>
        <Container>
          <ViewCatalog catalog={this.props.state.singleCategory} />
        </Container>
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
    fetchItems: (category, offset, history) =>
      dispatch(fetchItems(category, offset, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleCategory);
