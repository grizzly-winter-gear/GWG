import axios from "axios";
import thunk from "redux-thunk";

//ACTION CREATOR

export const setItems = (items) => {
  return {
    type: "SET_ITEMS",
    items
  }
};

//AXIOS CALL
export const pullItems = async () => {
  let result = await axios.get("/api/items");
  // console.log("axios call result", result.data)
}

//THUNKS

// export const fetchItems = () => {
//   return function (dispatch){
//     return pullItems().then(result => dispatch(setItems(result.data)));
//   }
// }


export const fetchItems = () => async (dispatch) => {
  const items = {
    item1: "item1",
    item2: "item2"
  };
  return dispatch(setItems(items));
};


export default function itemsReducer(state = {}, action){
  if (action.type === "SET_ITEMS"){
    return action.items;
  }else{
    return state;
  }
}
