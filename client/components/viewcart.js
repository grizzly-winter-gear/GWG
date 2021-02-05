import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
class ViewCart extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { state } = this.props;
    console.log(state);
    return (
      <div>
        <h3>Cart View below</h3>
        <p>Test to see that branch works</p>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    state,
  };
};

export default connect(mapState)(ViewCart);
