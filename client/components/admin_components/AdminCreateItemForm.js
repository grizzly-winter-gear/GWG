import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { connect } from 'react-redux';
import { createItem } from '../../store/allItems';
import Button from '@material-ui/core/Button';

class CreateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createItem({ ...this.state });
    this.setState({
      name: '',
      category: '',
    });
  }
  render() {
    const { name, category } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id="item-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name:</label>
        <input name="name" onChange={handleChange} value={name} />

        <label htmlFor="category">Category:</label>
        <input name="category" onChange={handleChange} value={category} />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapState = ({ state }) => {
  return { state };
};

const mapDispatch = (dispatch) => {
  return {
    createItem: (item) => dispatch(createItem(item)),
  };
};

export default connect(mapState, mapDispatch)(CreateItem);
