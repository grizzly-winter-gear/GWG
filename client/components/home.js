import React from 'react';
import { connect } from 'react-redux';
/**
 * COMPONENT
 */
export const Home = (props) => {
  // const { email } = props;

  return (
    <div>
      <section>
        <center>
          <div className="container">
            <h3>
              <i>Welcome to Grizzly Winter Gear!</i>
            </h3>
            <img className="carousel-image" src="./images/skimountain.jpg" />
            <div className="centered">
              Your premier destination for all winter sports gear!
            </div>
          </div>
        </center>
      </section>
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
