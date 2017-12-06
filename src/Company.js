import React from 'react';

function Company (props) {

    // constructor(props) { //this sets up that props are a thing held in HelloWorld Class Instances
    // 	super(props); //because this extends component? Kind of grabs "props" from it?
    // 	// this.state = { greeting: 'what' }; //default state
    // 	// this.frenchify = this.frenchify.bind(this); //this makes the "this" in frenchify refer to "this"
    // 	// this.removeGreeting = this.removeGreeting.bind(this);
    // }

    // render() {
        return ( 
        	<div className = 'Company' > 
        		<a href={props.link} target='blank' className = 'listItem' style={{cursor: 'pointer'}}> {props.name}</a>
            </div>
        );
    // }

    // frenchify() {
    // 	this.setState({greeting: "Bonjour"});
    // }

    // removeGreeting() {
    // 	this.props.removeGreeting(this.props.name);
    // }
}

export default Company;