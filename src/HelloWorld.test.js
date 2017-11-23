import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import HelloWorld from './HelloWorld';

describe(HelloWorld, () => {
    // Add the rest of our tests here later!
    const name = 'Person';

    const component = shallow( 
    	<HelloWorld name = { name }/> //make a "shallow" render of the hellowrodl component
    );


	it('renders and matches our snapshot', () => {
	  const component = renderer.create(
	    <HelloWorld name="Person" /> //setting up a hellowrodl component to test
	  );
	  const tree = component.toJSON(); //turning that component to jsan
	  expect(tree).toMatchSnapshot(); //comparing that json to a "snapshot?"
	});

	it('contains the supplied name', () => {
	  expect(component.text()).toContain(name); //the text inside component should contain the name const
	});

});