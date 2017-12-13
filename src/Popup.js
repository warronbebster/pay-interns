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
                  <p>I'm <a href="http://barronwebster.com" target="blank">Barron</a>. I made this to help anyone find an internship that they can afford to take in NYC. Internships are arguably the best way to get a foot in the door in the creative industry, but living in the Big Apple ain't cheap.</p>
                </li>
                <li>
                  <label>How was this data gathered?</label>
                  <p>All the places are on this list because I've verified that they pay interns over $13.40 with someone who has interned or worked there, or have seen job postings that verify that amount. (It's pretty un-scientific.)</p>
                </li>
                <li>
                  <label>Why $13.40?</label>
                  <p>$13.40 is the current living wage for NYC, according to <a href="https://www1.nyc.gov/site/dca/about/living-wage-law.page">NYC Consumer Affairs.</a></p>
                </li>
                <li>
                  <label>I know/am an employer who fits this description. Can you include them/me?</label>
                  <p>Yes! Use <a href="https://goo.gl/forms/JjKpfr9SKmb9X9863">this form</a> to let me know about them, and I'll include you!</p>
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