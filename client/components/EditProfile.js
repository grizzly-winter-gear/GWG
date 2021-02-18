import React from 'react';
import { connect } from 'react-redux';
import { fetchEditEmail } from '../store/users';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    // console.log("evt.target.value console log",evt.target.value)
    this.setState({
      email: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.editEmail(this.props.state.auth.id, this.state.email);
  }
  render() {
    // console.log('props', this.props);
    const { email } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id="item-form" onSubmit={handleSubmit}>
        <label htmlFor="email">New Email Adress:</label>
        <input name="email" onChange={handleChange} value={email} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editEmail: (id, email) => dispatch(fetchEditEmail(id, email)),
  };
};

export default connect(mapState, mapDispatch)(EditProfile);
