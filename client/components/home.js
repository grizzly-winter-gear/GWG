import React from 'react';
import { connect } from 'react-redux';
/**
 * COMPONENT
 */
export const Home = (props) => {
  // const { email } = props;

  return (

        <center>
            <h2>
              <i>Welcome to Grizzly Winter Gear!  </i>
            </h2>
            <br/>
            <h3><i>Your premier destination for all winter sports gear! </i></h3>
            <img className="carousel-image" src="./images/skimountain.jpg" />
        </center>

  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
