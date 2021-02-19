import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StorefrontIcon from '@material-ui/icons/Storefront';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="header">
    <nav>
      <Link className="logo-navbar" to="/home">
        Grizzly Winter Gear
      </Link>
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <HomeIcon fontSize="small" />
            Home
          </Link>

          <div className="dropdown">
            <button className="dropbtn">
              <StorefrontIcon fontSize="small" />
              Select a category
            </button>
            <div className="dropdown-content">
              <a href="/singlecategory/All/0">All</a>
              <a href="/singlecategory/Accessories/0">Accessories</a>
              <a href="/singlecategory/Clothes/0">Clothes</a>
              <a href="/singlecategory/Gear/0">Gear</a>
            </div>
          </div>

          <Link to="/account">
            <AccountBoxIcon fontSize="small" />
            Account
          </Link>
          <Link to="/viewcart">
            <ShoppingCartIcon fontSize="small" />
            View Cart
          </Link>
          <a href="#" onClick={handleClick}>
            <ExitToAppIcon fontSize="small" />
            Logout
          </a>
        </div>
      ) : (
        <div className="navBar">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>

          <div className="dropdown">
            <button className="dropbtn">
              <StorefrontIcon fontSize="small" />
              Select a category
            </button>
            <div className="dropdown-content">
              <a href="/singlecategory/All/0">All</a>
              <a href="/singlecategory/Accessories/0">Accessories</a>
              <a href="/singlecategory/Clothes/0">Clothes</a>
              <a href="/singlecategory/Gear/0">Gear</a>
            </div>
          </div>
          <Link to="/viewcart">
            <ShoppingCartIcon fontSize="small" />
            View Cart
          </Link>
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
  };
};

export default connect(mapState, mapDispatch)(Navbar);
