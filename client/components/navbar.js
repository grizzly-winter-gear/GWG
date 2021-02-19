import axios from 'axios';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => {

  let history = useHistory();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (evt) => {
    setSearchInput(evt.target.value);
  }

  const handleSearchClick = async(evt) => {
    //axios call
    let result = await axios.get(`/api/items`, {
      params: {
        itemName: searchInput
      }
    });

    console.log("the result",result)

    if (result.data.length >0){
      const item_id = result.data[0].id;
      history.push(`/singleItem/${item_id}`)
    }else{
      alert("No Match Found!")
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

          <input type="text" placeholder="Search..." onChange={handleSearchChange}/>

          <div className="container-img">
          <img className="search-icon" src="./images/search-icon.jpg" onClick={handleSearchClick} />
          </div>

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
