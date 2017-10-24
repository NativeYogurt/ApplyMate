import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SavedJobs from '../src/components/dashboard/SavedJobs';
import Dashboard from '../src/components/dashboard/dashboard';

configure({ adapter: new Adapter() });


test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const deleteJob = () => { console.log('test')};
  let favorite = false;
  const favoriteJob = () => { favorite = !favorite; };
  const skills = ['test']
  let savedJob = shallow((
    <SavedJobs jobPosting={{ favorite, deleteJob, skills}} favoriteJob={favoriteJob} />
  ));
  expect(savedJob.find('#favorite').getElements()[0].props.src).toEqual('http://res.cloudinary.com/dxcydtwom/image/upload/v1508791216/hollow_gold_star_unli4s.png');

  savedJob.find('#favorite').simulate('click');
  savedJob = shallow((
    <SavedJobs jobPosting={{ favorite, deleteJob, skills}} favoriteJob={favoriteJob} />
  ));
  expect(savedJob.find('#favorite').getElements()[0].props.src).toEqual('http://res.cloudinary.com/dxcydtwom/image/upload/v1508791828/gold_star_bagtk7.png');
});


// test('Should error if not all required fields are filled out when adding a job', () => {
//   const getJobs = jest.fn();
//   const dashboard = shallow((
//     <Dashboard userId="1" savedJobs={[]} getJobs={getJobs}/>
//   ));
//   console.log(dashboard.find('.error'));
//   console.log(dashboard.state());
//   dashboard.find('.button').simulate('submit');
//   console.log(dashboard.find('.button'));
//   console.log(dashboard.state());
//
// });
