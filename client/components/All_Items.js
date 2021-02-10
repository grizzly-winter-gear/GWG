import React from 'react';
import { connect } from 'react-redux';
import { fetchItems, destroyItem } from '../store/allItems';
import { fetchAddItem } from '../store/cart';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";

class All_Items extends React.Component {
  componentDidMount() {
    this.props.getItems(this.props.state.allItems.index);
  }

  render() {
    //UPDADTE QUANTITY AMOUNT LATER (OPTION FOR QUANTITYS), FIXED TO 1//)
    const { privilege } = this.props.state.auth;
    let { catalog } = this.props.state.allItems;
    return (
      <div>
        <p>Catalog items on this page: {catalog.length}</p>
        <Button variant="contained" color="primary"
          onClick={() => this.props.getItems(this.props.state.allItems.index)}
        >
          Next Page
        </Button>
        {privilege === 'administrator' && <h4>You have admin control</h4>}
        <ul className="catalog">
          {catalog.length !== 0 ? (
            catalog.map((item, idx) => {
              return (
                <li key={idx}>
                  <img src={item.imageURL} title={item.name} />
                  <Link to={`/singleItem/${item.id}`}>{item.name}</Link>
                  <button
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
                  </button>
                  {/* TODO: IMPLEMENT STOCK CONTROLS AND DELETION CONTROLS FOR ADMINISTRATOR PRIV */}
                  {privilege === 'administrator' && (
                    <button
                      title={'Delete ' + item.name}
                      onClick={() => this.props.destroyItem(item.id)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ); //close return
            }) //close map
          ) : (
            <p>No Items To Display</p>
          )}
        </ul>
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
