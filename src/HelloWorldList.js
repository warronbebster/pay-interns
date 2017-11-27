import React, { Component } from 'react';
import './HelloWorldList.css';

import HelloWorld from './HelloWorld';
import SearchBar from './SearchBar';
import Fuse from 'fuse.js';

import data from './data.json';

const spreadsheet_id = '1xNsQmQpY9q17AmFMTQ08KdrCMIv2pIs3NV0OFvGpQQg'
const CLIENT_ID = '302317628990-uprj9ltm5kdls08cho810kog75o469qq.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD14ItLXnxvvSgeovNvQB7FVkyIKd555NU';
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const fuseOptions = {
	shouldSort: true,
	threshold: 0.6,
	location: 0,
	distance: 100,
	maxPatternLength: 24,
	minMatchCharLength: 1,
	keys: [
		"name"
	]
};

class HelloWorldList extends Component {
	constructor(props) {
	    super(props); //grabs props from "component"
	    // this.state = { greetings: ['Jim', 'Sally', 'bender'] }; 
	    this.searchBar = this.searchBar.bind(this);
	    // this.removeGreeting = this.removeGreeting.bind(this);
	    this.componentDidMount = this.componentDidMount.bind(this);
	    this.state = data; //make the state of HelloWorldList 
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
		        window.gapi.client.sheets.spreadsheets.values.get({
		            spreadsheetId: spreadsheet_id,
		            range: 'Firms!A:B',
		        }).then((response) => {
		        	data.sites = [];//clear data.sites, gets rid of loading thing
		            let range = response.result.values;
		            console.log(range);
		            // let newState = [];

		   //          var obj = Object.assign(...range.values.map((d, index) => ( [{name:d[0], website:d[1]}] ) ) );

					// let obj2 = range.values.reduce((o, [name, website], index) => {
					//     o['name'] = name;
					//     o['website'] = website;
					//     // o[name] = website;
					//     return o;
					// }, {});

		   //          // console.log(obj);
		   //          console.log(obj2);

		            if (range.length > 0) {
		                for (let i = 0; i < range.length; i++) {
		                    let firmObject = { 'name': range[i][0], 'website': range[i][1] };
		                    data.sites.push(firmObject);
		                    stateSelf.setState({ sites: data.sites });
		                }
		                // console.log(newState);
		                // data.sites = newState; //set the "sites" array in data to the new info from spreadsheet
		                console.log(data.sites);
		                
		            } else {
		                console.log('No data found.');
		            }
		        }, function(response) {
		            console.log('Error: ' + response.result.error.message);
		        });
		        // authorizeButton.onclick = handleAuthClick;
		        // signoutButton.onclick = handleSignoutClick;
		    });
		}

		function listMajors() {
			
		}

	}



    render() {
        return (
        	<div className="HelloWorldList" >
        		<SearchBar searchBar={this.searchBar} />{/*passes the searchbar function as a prop to SearchBar */}
        		{this.renderList()}
            </div>
        );
    }

    updateList() {

    }

    searchBar(searchString) { //this function is going to get passed as a prop to the "searchBar" file
    	if (searchString.length != 0){ //if there's something in the search box
			const newFuse = new Fuse(data.sites, fuseOptions); //new Fuse object
			const result = newFuse.search(searchString); //run the search, return to results (returns array)
			this.setState({sites:result}); //set state as results of search
    	}else { //if the search box is empty
    		this.setState({sites:data.sites}); //reset the state to the full sites array from data
    	}

    }

 	//    listMajors() {
	// 	window.gapi.client.sheets.spreadsheets.values.get({
	// 	  spreadsheetId: spreadsheet_id,
	// 	  range: 'Firms!A:B',
	// 	}).then((response) => {
	// 	  let range = response.result;
	// 	  let newState = [];

	// 	  if (range.values.length > 0) {
	// 	    for (let i = 0; i < range.values.length; i++) {
	// 	      let row = range.values[i];
	// 	      let firmObject = {'name': row[0], 'website': row[1]};
	// 	      // newState[i].name = row[0];
	// 	      // newState[i].website = row[1];
	// 	      newState.push(firmObject);
	// 	      //maybe here make a 
	// 	      // Print columns A and E, which correspond to indices 0 and 4. 
	// 	    }
	// 	    console.log(newState);
	// 	    this.setState({sites: newState});
	// 	  } else {
	// 	    console.log('No data found.');
	// 	  }
	// 	}, function(response) {
	// 	  console.log('Error: ' + response.result.error.message);
	// 	});
	// }

	// initClient() {
	//     window.gapi.client.init({
	//         apiKey: API_KEY,
	//         clientId: CLIENT_ID,
	//         discoveryDocs: DISCOVERY_DOCS,
	//         scope: SCOPES
	//     }).then(() => {
	//         // Listen for sign-in state changes.
	//         // window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

	//         // Handle the initial sign-in state.
	//         // updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
	//         this.listMajors();
	//         // authorizeButton.onclick = handleAuthClick;
	//         // signoutButton.onclick = handleSignoutClick;
	//     });
	// }





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