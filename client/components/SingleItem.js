import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../store/singleItem';
import { fetchAddItem } from '../store/cart';

class SingleItem extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchItem(id);
  }

  render() {
    const item = this.props.state.singleItem;
    return (
      <div className="catalogItem">
        <img className="itemImage" title={item.name} src={item.imageURL} />
        <h4> {item.name}</h4>
        <p>${item.price}</p>
        <p>Rating: {item.rating}</p>
        <p>{item.description}</p>

        <button
          onClick={() =>
            this.props.fetchAddItem(this.props.state.auth.id, item.id, 1)
          }
        >
          Add to Cart
        </button>
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
    fetchItem: (id) => dispatch(fetchItem(id)),
    fetchAddItem: (userId, itemId, quantity) =>
      dispatch(fetchAddItem(userId, itemId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
