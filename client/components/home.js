import React from 'react';
import { connect } from 'react-redux';
/**
 * COMPONENT
 */
export const Home = (props) => {
  // const { email } = props;

  return (
    <div>

        <center>
            <h3>
              <i>Welcome to Grizzly Winter Gear!</i>
            </h3>

          </center>


          <div className="container">
          <center>

            <img className="carousel-image" src="./images/skimountain.jpg" />
            <div className="centered">
              Your premier destination for all winter sports gear!
            </div>

        </center>
        </div>

    </div>
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
