import React, { Component } from 'react';

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }

  togglePopup() {//this just inverts the state
    this.setState({showPopup: !this.state.showPopup});
  }

  render() {
    return (
      <div className='app'>

        <div id='questions' onClick={this.togglePopup.bind(this)}>
          <div>
            {this.state.showPopup ? 'X' : '?'}
          </div>
        </div>

        {this.state.showPopup ? 
          <div>
            <div className='popup' onClick={this.togglePopup.bind(this)}>
            </div>
            <div className='popup_inner'>
              <ul>
                <li>
                  <label>Who made this, and why?</label>
                  <p>I'm Barron, and I made this .</p>
                </li>
                <li>
                  <label>How was this data gathered?</label>
                  <p>All the places are on this list because I've verified that they pay interns over $13.40 with someone who has interned or worked there, or have seen job postings that verify that amount. (It's pretty un-scientific.)</p>
                </li>
                <li>
                  <label>Why $13.40?</label>
                  <p>Yes! Use <a href="">this form</a> to let </p>
                </li>
                <li>
                  <label>I know an employer who fits this description. Can you include them?</label>
                  <p>Yes! Use <a href="">this form</a> to let </p>
                </li>
              </ul>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
};

export default Popup;