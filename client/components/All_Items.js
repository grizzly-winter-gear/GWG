import Container from '@material-ui/core/Container';
import React from 'react';
import { connect } from 'react-redux';
import { fetchItems, destroyItem } from '../store/allItems';
import { fetchAddItem } from '../store/cart';

import ViewCatalog from './ViewCatalog';

class All_Items extends React.Component {
  componentDidMount() {
    this.props.getItems(this.props.state.allItems.index);
  }
  render() {
    let { catalog } = this.props.state.allItems;
    return (
      <Container>
        <ViewCatalog catalog={catalog} />
      </Container>
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
    getItems: (index) => dispatch(fetchItems(index)),
    fetchAddItem: (userId, itemId, quantity) =>
      dispatch(fetchAddItem(userId, itemId, quantity)),
    destroyItem: (id) => dispatch(destroyItem(id)),
  };
};

export default connect(mapState, mapDispatch)(All_Items);
