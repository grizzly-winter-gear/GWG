import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../store/singleItem';

class SingleItem extends Component {
  componentDidMount() {
    const id = parseInt(
      this.props.location.pathname.slice(
        this.props.location.pathname.lastIndexOf('/') + 1
      )
    );

    this.props.fetchItem(id);
  }

  render() {
    //conosle.log(this.props.state)
    const singleItem = this.props.state.singleItem;
    return (
      <ul id="single_component" className="single_commponet_class">
        {Object.keys(singleItem).map((key, idx) => {
          return (
            <li key={idx}>
              {key}: {singleItem[key]}
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

export default connect(mapState, (dispatch) => {
  return {
    fetchItem: (id) => dispatch(fetchItem(id)),
  };
})(SingleItem);
