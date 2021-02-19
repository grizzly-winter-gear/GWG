import React from 'react';
import { connect } from 'react-redux';
import { fetchItems, destroyItem } from '../../store/allItems';
import AdminCreateItemForm from './AdminCreateItemForm';
import AdminItemsTable from './AdminItemsTable';

class AdminItems extends React.Component {
  componentDidMount() {}
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
        <AdminItemsTable />
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
  return {};
};

export default connect(mapState, mapDispatch)(AdminItems);
