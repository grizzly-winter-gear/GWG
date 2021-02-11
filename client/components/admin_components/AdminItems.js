import React from 'react';
import { connect } from 'react-redux';
import { fetchItems, destroyItem } from '../../store/allItems';
import AdminCreateItemForm from './AdminCreateItemForm';
import AdminItemsTable from './AdminItemsTable';

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
        <AdminItemsTable
        // catalog={catalog}
        // destroyItem={this.props.destroyItem}
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
    destroyItem: (id) => dispatch(destroyItem(id)),
  };
};

export default connect(mapState, mapDispatch)(AdminItems);
