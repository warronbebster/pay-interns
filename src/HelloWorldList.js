import React, { Component } from 'react';
import './HelloWorldList.css';

import HelloWorld from './HelloWorld';
// import AddGreeter from './AddGreeter';

import data from './data.json';

// import ReactGoogleSheetConnector from "react-google-sheet-connector"

const spreadsheet_id = '1xNsQmQpY9q17AmFMTQ08KdrCMIv2pIs3NV0OFvGpQQg'

const CLIENT_ID = '302317628990-uprj9ltm5kdls08cho810kog75o469qq.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD14ItLXnxvvSgeovNvQB7FVkyIKd555NU';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

console.log(data);

class HelloWorldList extends Component {
	constructor(props) {
	    super(props); //grabs props from "component"
	    // this.state = { greetings: ['Jim', 'Sally', 'bender'] }; 
	    // this.addGreeting = this.addGreeting.bind(this);
	    // this.removeGreeting = this.removeGreeting.bind(this);
	    this.componentDidMount = this.componentDidMount.bind(this);
	    this.state = {
	    	sites:data
	    }; //make the state of HelloWorldList 
	}


	componentDidMount() { //this runs once the component "mounts" in the DOM

		var stateSelf = this; //have to do this because of this scope, could fix with arrow functions

		window.gapi.load('client:auth2', initClient);

		function initClient() {
		    window.gapi.client.init({
		        apiKey: API_KEY,
		        clientId: CLIENT_ID,
		        discoveryDocs: DISCOVERY_DOCS,
		        scope: SCOPES
		    }).then(() => {
		        // Listen for sign-in state changes.
		        // window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		        // Handle the initial sign-in state.
		        // updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
		        listMajors();
		        // authorizeButton.onclick = handleAuthClick;
		        // signoutButton.onclick = handleSignoutClick;
		    });
		}

		function listMajors() {
			window.gapi.client.sheets.spreadsheets.values.get({
			  spreadsheetId: spreadsheet_id,
			  range: 'Firms!A:B',
			}).then((response) => {
			  let range = response.result;
			  let newState = [];

			  if (range.values.length > 0) {
			    for (let i = 0; i < range.values.length; i++) {
			      let row = range.values[i];
			      let firmObject = {'name': row[0], 'website': row[1]};
			      // newState[i].name = row[0];
			      // newState[i].website = row[1];
			      newState.push(firmObject);
			      //maybe here make a 
			      // Print columns A and E, which correspond to indices 0 and 4. 
			    }
			    console.log(newState);
			    stateSelf.setState({sites: newState});
			  } else {
			    console.log('No data found.');
			  }
			}, function(response) {
			  console.log('Error: ' + response.result.error.message);
			});
		}

	}



    render() {
        return ( 
        	<div className="HelloWorldList" >
        		{this.renderList()}
            </div>
        );
    }

    updateList() {

    }





    // addGreeting(newName){ //this function just updates this.state
    // 	this.setState({ greetings: [...this.state.greetings, newName] }); //the ... here says "put newName at the end of this array"
    // }

    // renderGreetings() {
    //     return this.state.map(name => ( //map each thing in the "greetings" array to this function
    //     	<HelloWorld key = { name } name = { name } removeGreeting = {this.removeGreeting}/> //this is where "remove Greeting" gets passed as a prop
    //     ));
    // }

    renderList() { //we could just dump the stuff in here inside render
        return this.state.sites.map((data, index) => ( //map each thing in the "greetings" array to a "helloWorld" component
        	<HelloWorld key = {index} link = { data.link } name = { data.name } /> //this is where "remove Greeting" gets passed as a prop
        ));
    }

	// removeGreeting(removeName) {
	//   const filteredGreetings = this.state.greetings.filter(name => {
	//     return name !== removeName;
	//   });
	//   this.setState({ greetings: filteredGreetings });//update state
	// }

}

export default HelloWorldList;