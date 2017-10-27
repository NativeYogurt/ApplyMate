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
  expect(savedJob.find('.favorite').getElements()[0].props.icon).toEqual('favorite_border');
  savedJob.find('.favorite').simulate('click');
  savedJob = shallow((
    <SavedJobs jobPosting={{ favorite, deleteJob, skills}} favoriteJob={favoriteJob} deleteJob={deleteJob}/>
  ));
  expect(savedJob.find('.favorite').getElements()[0].props.icon).toEqual('favorite');
});

//
test('Should error if not all required fields are filled out when adding a job', async () => {

  const nightmare = Nightmare({show: true});
  let test = await nightmare
    .goto('http://localhost:3000')
    .wait('#signin')
    .type('#email', 'nightmare@test.com')
    .type('#pw', 'nightmare')
    .click('#signin-button')
    .wait('#add')
    .click('#add')
    .wait('#add-job')
    .click('#add-job')
    .evaluate(() => {
      let error = document.querySelector('.error').innerText;
      return error;
    })
    .end()
    .then((error) => { // This will log the your local IP
      expect(error).toEqual('Please Add a Company Name')
  });


}, 20000);
