import React, { Component } from 'react';
// import fuse from 'fuse.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searching: '' }; //state of this addGreeter Component
    // this.handleUpdate = this.handleUpdate.bind(this); //makes "this" work correctly inside of handleUpdate
    this.searchBar = this.searchBar.bind(this);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          type="text"
          maxLength="24"
          onChange={this.searchBar}
          placeholder="Search"
          value={this.state.searching} //this is mostly just to delete what's in there when addGreeting is activated
          autoFocus
        />
        &nbsp;&nbsp;
        {/*<button onClick={this.addGreeting}>Add</button> */}
      </div>
    );
  }


  searchBar(event) {
    // this.setState({ searching: event.target.value });
    this.setState({searching: event.target.value})
    this.props.searchBar(event.target.value); //gets function from above, calls it on this greeting name
    // this.setState({ greetingName: '' });
  }

}

export default SearchBar;