import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleItem from './singleItem';
import cart from './cart';
import allItems from './allItems';
import users from './users';
import previousPurchases from './previousPurchases';
import singleCategory from './singleCategory';

const reducer = combineReducers({
  auth,
  singleItem,
  cart,
  allItems,
  users,
  previousPurchases,
  singleCategory,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
