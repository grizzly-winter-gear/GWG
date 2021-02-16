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
       <img class="carousel-image" src="./images/skimountain.jpg"/>
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
