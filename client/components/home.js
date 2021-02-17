import React from 'react';
import { connect } from 'react-redux';
import All_Items from './All_Items';
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;

  return (
    <div>
      <center>
      <div id="intro">
        <i>Welcome to Grizzly Winter Gear, {email}! </i>
        </div>
      </center>
      <section>
        <center>
          <div class="container">
            <img class="carousel-image" src="./images/skimountain.jpg"/>
            <div class="centered">Your premier destination for all winter sports gear!</div>
          </div>
       </center>
      </section>
      <All_Items />
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
