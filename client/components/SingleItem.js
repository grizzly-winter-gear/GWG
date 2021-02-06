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
    const singleItem = this.props.state.singleItem;
    return (
      <div>
        <ul id="single_component" className="single_commponet_class">
          {Object.keys(singleItem).map((key, idx) => {
            return (
              <li key={idx}>
                {key}: {singleItem[key]}
              </li>
            );
          })}
        </ul>
        <button
          onClick={() =>
            this.props.fetchAddItem(this.props.state.auth.id, singleItem.id, 1)
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
