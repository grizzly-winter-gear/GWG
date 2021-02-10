import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../store/singleCategory';

class SingleCategory extends Component {
  componentDidMount() {
    const categName = this.props.match.params.id;
    this.props.fetchItems(categName);
    console.log("testing", categName)
  }

  render() {
    const item = this.props.state.singleItem;
    return (
      <div className="catalogItem">
        <center>
       <p> All Items from this Category --- test </p>
       </center>
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
    fetchItems: (category) => dispatch(fetchItems(category))
  };
};

export default connect(mapState, mapDispatch)(SingleCategory);
