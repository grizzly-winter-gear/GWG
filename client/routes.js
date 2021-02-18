import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  Login,
  Signup,
  Home,
  Account,
  ViewCart,
  SingleItem,
  Success,
} from './components';

import checkoutPage from './components/checkoutPage';
import SingleCategory from './components/SingleCategory';

import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/account" component={Account} />
            <Route path="/viewcart" component={ViewCart} />
            <Route path="/checkout" component={checkoutPage} />
            <Route path={`/singleItem/:id`} component={SingleItem} />
            <Route
              path={`/singleCategory/:category/:offset`}
              component={SingleCategory}
            />
            <Route path="/success" component={Success} />
            {/* <Redirect to="/home" /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path={`/singleItem/:id`} component={SingleItem} />
            <Route
              path={`/singleCategory/:category/:offset`}
              component={SingleCategory}
            />
            <Route path="/viewcart" component={ViewCart} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  // console.log(state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    singleItem: state.singleItem,
    offset: state.singleCategory.offset,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
