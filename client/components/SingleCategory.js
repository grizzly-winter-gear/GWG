import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../store/singleCategory';
import Container from '@material-ui/core/Container';
import ViewCatalog from './ViewCatalog';

class SingleCategory extends Component {
  componentDidMount() {
    const categName = this.props.match.params.category;
    this.props.fetchItems(categName);
  }

  render() {
    return (
      <div>
        <center>
          <h1 className="category-header">
            {this.props.match.params.category}{' '}
          </h1>
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
    fetchItems: (category) => dispatch(fetchItems(category)),
  };
};

export default connect(mapState, mapDispatch)(SingleCategory);
