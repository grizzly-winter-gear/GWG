import React from "react";
import { connect } from "react-redux";
import {setItems, fetchItems} from "../store/allItems"

class All_Items extends React.Component {
  componentDidMount(){
    this.props.getItems();
  }

  render(){
    console.log("testing, render", this.props.items)
    return (
      <div>
        <center>
          <p>Insert all items data here, testing , tbd</p>
          {this.props.items}
        </center>
      </div>
    )
  }

}//end class


const mapState = (state) => {
  console.log("current state parameter", state)
  return {
    items: state.items
  }
}

const mapDispatch = (dispatch) => {
  return {
    getItems: () => dispatch(fetchItems())
  }
}

export default connect(mapState, mapDispatch)(All_Items)
//connect function - will connect a react component to a redux store
