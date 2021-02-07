import React from 'react';
import { connect } from 'react-redux';
import { fetchEditPrivilege } from '../store/auth';
/**
 * COMPONENT
 */
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'customer' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.fetchEditPrivilege(this.props.account.id, this.state.value);
    event.preventDefault();
  }
  render() {
    const { account } = this.props;
    console.log(account);
    return (
      <div>
        <h3>
          Welcome to GWG, {account.email}. You may view your account info and
          purchases here
        </h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Set your privilege:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="customer">Customer</option>
              <option value="engineer">Engineer</option>
              <option value="administrator">Administrator</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <h3>Account details</h3>
        <ul id="account_component" className="account_component_class">
          {Object.keys(account)
            .filter((key) => key !== 'password')
            .map((key, idx) => {
              return (
                <li key={idx}>
                  {key}: {account[key]}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    account: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchEditPrivilege: (userId, privilege) =>
      dispatch(fetchEditPrivilege(userId, privilege)),
  };
};

export default connect(mapState, mapDispatch)(Account);
