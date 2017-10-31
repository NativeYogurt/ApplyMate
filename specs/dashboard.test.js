import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nightmare from 'nightmare';
import sinon from 'sinon';
import SavedJobs from '../src/components/dashboard/SavedJobs';
import Dashboard from '../src/components/dashboard/dashboard';

configure({ adapter: new Adapter() });

const skills = ['test']
let favorite = false;
const deleteJob = jest.fn();
const favoriteJob = () => { favorite = !favorite; };
test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document

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
xtest('Should error if not all required fields are filled out when adding a job', async () => {

  const nightmare = Nightmare();
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


test('Should call revertJobUrlToActive when revert button is clicked', () => {
  const revertJobUrlToActive = jest.fn();
  const activeJobPosting = false;
  let savedJob = shallow((
    <SavedJobs  jobPosting={{ favorite, skills, activeJobPosting}} favoriteJob={favoriteJob} deleteJob={deleteJob} revertJobUrlToActive={revertJobUrlToActive}/>
  ));
  expect(revertJobUrlToActive.mock.calls.length).toBe(0);
  savedJob.find('#refresh').simulate('click');
  expect(revertJobUrlToActive.mock.calls.length).toBe(1);
});
