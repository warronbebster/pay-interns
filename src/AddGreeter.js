import React, { Component } from 'react';
import './AddGreeter.css';

class AddGreeter extends Component {
  constructor(props) {
    super(props);
    this.state = { greetingName: '' }; //state of this addGreeter Component
    this.handleUpdate = this.handleUpdate.bind(this); //makes "this" work correctly inside of handleUpdate
    this.addGreeting = this.addGreeting.bind(this);
  }

  render() {
    return (
      <div className="AddGreeter">
        <input
          type="text"
          onChange={this.handleUpdate}
          value={this.state.greetingName} //this is mostly just to delete what's in there when addGreeting is activated
        />
        &nbsp;&nbsp;
        <button onClick={this.addGreeting}>Add</button>
      </div>
    );
  }

  handleUpdate(event) {
    this.setState({ greetingName: event.target.value });
  }

  addGreeting() {
    this.props.addGreeting(this.state.greetingName); //gets function from above, calls it on this greeting name
    this.setState({ greetingName: '' });
  }

}

export default AddGreeter;