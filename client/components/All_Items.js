import React from 'react';
import { connect } from 'react-redux';
import { setItems, fetchItems } from '../store/allItems';
import { fetchAddItem } from '../store/cart';
import { withRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

class All_Items extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    //UPDADTE QUANTITY AMOUNT LATER (OPTION FOR QUANTITYS), FIXED TO 1//)
    const { privilege } = this.props.state.auth;

    return (
      <div>
        {privilege === 'administrator' && <h4>You have admin control</h4>}
        <ul className="catalog">
          {Array.isArray(this.props.state.allItems) &&
          this.props.state.allItems.length !== 0 ? (
            this.props.state.allItems.map((item, idx) => {
              return (
                <li key={idx}>
                  <img src={item.imageURL} />
                  <Link to={`/singleItem/${item.id}`}>{item.name}</Link>
                  <button
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
                      onClick={() => this.props.fetchAdminDeleteItem(item.id)}
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
  // console.log("current state parameter", state)
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItems: () => dispatch(fetchItems()),
    fetchAddItem: (userId, itemId, quantity) =>
      dispatch(fetchAddItem(userId, itemId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(All_Items);
//connect function - will connect a react component to a redux store
