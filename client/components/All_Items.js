import React from 'react';
import { connect } from 'react-redux';
import { setItems, fetchItems } from '../store/allItems';
import { fetchAddItem } from '../store/cart';

class All_Items extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    console.log('testing, render', this.props.state.allItems);
    //UPDADTE QUANTITY AMOUNT LATER (OPTION FOR QUANTITYS), FIXED TO 1//)
    return (
      <div>
        <center>
          {Array.isArray(this.props.state.allItems) &&
          this.props.state.allItems.length !== 0 ? (
            this.props.state.allItems.map((item, idx) => {
              return (
                <div key={idx}>
                  {item.name}
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
                </div>
              ); //close return
            }) //close map
          ) : (
            <p>No Items To Display</p>
          )}
        </center>
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
