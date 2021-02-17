import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { redirect } from "../store";

const Navbar = ({ handleClick, isLoggedIn, handleSubmit, handleSearchInput }) => (
  // let [currentState, updateState] = useState(0);
  <div className="header">
    <nav>
      <h1>Grizzly Winter Gear</h1>
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}

          <form class="example" action="action_page.php">
            <input type="text" placeholder="Search.." name="search" onChange={handleSearchInput}/>
            <div id='button-holder' onClick={handleSubmit}>
              <img src="./images/magnifying-glass.png" />
            </div>
          </form>

          <Link to="/home">Home</Link>

 user-profile-buildout
        <div className="dropdown">
          <button className="dropbtn">Shop</button>
          <div className="dropdown-content">
            <a href="/singlecategory/Accessories">Accessories</a>
            <a href="/singlecategory/Clothes">Clothes</a>
            <a href="/singlecategory/Gear">Gear</a>
          </div>
        </div>

          <div className="dropdown">
            <button className="dropbtn">Select a category</button>
            <div className="dropdown-content">
              <a href="/singlecategory/All/0">All</a>
              <a href="/singlecategory/Accessories/0">Accessories</a>
              <a href="/singlecategory/Clothes/0">Clothes</a>
              <a href="/singlecategory/Gear/0">Gear</a>
            </div>
          </div>

 main
          <Link to="/account">Account</Link>
          <Link to="/viewcart">View Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navBar">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    handleSubmit(state){
      dispatch(redirect(state));
    },
    handleSearchInput(event){
      // console.log("what is the event", event)

    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
