import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SavedJobs from '../src/components/dashboard/SavedJobs';

configure({ adapter: new Adapter() });


test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const deleteJob = () => { console.log('test')};

  const skills = ['test']
  const savedJob = shallow(
    <SavedJobs jobPosting={{ favorite: false, deleteJob, skills }} /> );
  //expect(savedJob.getElement('img').props).toEqual('Off');

  savedJob.find('input').simulate('change');

  //expect(savedJob.text()).toEqual('On');
});
