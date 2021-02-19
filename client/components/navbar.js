import React, {useState} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Link, useHistory} from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => {

  let history = useHistory();
  const [searchInput, setSearchInput] = useState(""); //will only edit the variable associated with the function

 const handleSearchChange = (evt) => {
    setSearchInput(evt.target.value);
  }

  const handleSearchClick = async (evt) => {
    //axios call
      let result = await axios.get(`/api/items`, {
       params: {
         itemName: searchInput
       }
      });

      if (result.data.length > 0){
        const item_id = result.data[0].id;
        console.log(item_id);
        history.push(`/singleItem/${item_id}`);
        // window.location.href = `https://localhost:8080/singleItem/${item_id}`
        // //redirect
      }
      else {
        //redirect to "no result page";
      }
  }

  return (
  <div className="header">
    <nav>
      <div className="logo-navbar">
      <Link to="/home">Grizzly Winter Gear</Link>
      </div>
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}

          <input type="text" placeholder="Search..."onChange={handleSearchChange}/>
          <img className="search-icon" src ="./images/search-icon.jpg"  onClick={handleSearchClick} />

          <Link to="/home">Home</Link>

          <div className="dropdown">
            <button className="dropbtn">Select a category</button>
            <div className="dropdown-content">
              <a href="/singlecategory/All/0">All</a>
              <a href="/singlecategory/Accessories/0">Accessories</a>
              <a href="/singlecategory/Clothes/0">Clothes</a>
              <a href="/singlecategory/Gear/0">Gear</a>
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
          <Link to="/viewcart">View Cart</Link>
          <div className="dropdown">
            <button className="dropbtn">Select a category</button>
            <div className="dropdown-content">
              <a href="/singlecategory/All/0">All</a>
              <a href="/singlecategory/Accessories/0">Accessories</a>
              <a href="/singlecategory/Clothes/0">Clothes</a>
              <a href="/singlecategory/Gear/0">Gear</a>
            </div>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)};

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
