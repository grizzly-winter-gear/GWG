import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="header">
    <nav>
      <h1>Grizzly Winter Gear</h1>
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}

          <form class="example" action="action_page.php">
            <input type="text" placeholder="Search.." name="search"/>
            <div id='button-holder'>
              <img src="./images/magnifying-glass.png" />
            </div>
          </form>

          <Link to="/home">Home</Link>

        <div className="dropdown">
          <button className="dropbtn">Shop</button>
          <div className="dropdown-content">
            <a href="/singlecategory/Accessories">Accessories</a>
            <a href="/singlecategory/Clothes">Clothes</a>
            <a href="/singlecategory/Gear">Gear</a>
          </div>
        </div>
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
  };
};

export default connect(mapState, mapDispatch)(Navbar);
