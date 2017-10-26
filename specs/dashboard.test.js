import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nightmare from 'nightmare';
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
    <SavedJobs jobPosting={{ favorite, skills}} favoriteJob={favoriteJob} deleteJob={deleteJob} />
  ));
  expect(savedJob.find('#favorite').getElements()[0].props.src).toEqual('http://res.cloudinary.com/dxcydtwom/image/upload/v1508791216/hollow_gold_star_unli4s.png');

  savedJob.find('#favorite').simulate('click');
  savedJob = shallow((
    <SavedJobs jobPosting={{ favorite, deleteJob, skills}} favoriteJob={favoriteJob} deleteJob={deleteJob}/>
  ));
  expect(savedJob.find('#favorite').getElements()[0].props.src).toEqual('http://res.cloudinary.com/dxcydtwom/image/upload/v1508791828/gold_star_bagtk7.png');
});

//
test('Should error if not all required fields are filled out when adding a job', async () => {

  const getJobs = jest.fn();
  const savedJobs = [];
  const dashboard = mount((
    <Dashboard userId="1" savedJobs={savedJobs} getJobs={getJobs} deleteJob={jest.fn()} addJob={jest.fn()} getJobComparison={jest.fn()}/>
  ));
  const nightmare = Nightmare();
  let test = await nightmare
    .goto('http://localhost:3000')
    .wait('#signin')
    .type('#email', 'nightmare@test.com')
    .type('#pw', 'nightmare')
    .click('#signin-button')
    .wait('.button')
    .click('.button')
    .wait(1000)
    .evaluate(() => {
      let error = document.querySelector('.error').innerText;
      return error;
    })
    .end()
    .then((error) => { // This will log the your local IP
      expect(error).toEqual('Please Add a Company Name')
  });

  //dashboard.find('.button').simulate('submit');

}, 20000);
