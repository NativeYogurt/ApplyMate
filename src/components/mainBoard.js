import React from 'react';
import { HashRouter, browserHistory, Route, Redirect, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import axios from 'axios';

import Dashboard from './dashboard/dashboard';
import Resume from './resume';
import Resources from './resources/resources';
import Profile from './Profile';
import SearchJobs from './job-search/SearchJobs';
import JobEdit from './dashboard/JobEdit';
import JobHome from './dashboard/JobHome';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      githubUsername: '',
      savedJobs: [],
      resume: '',
      userSkills: [],
      missingSkills: [],
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.getJobComparison = this.getJobComparison.bind(this);
    this.addJob = this.addJob.bind(this);
    this.clearResume = this.clearResume.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.getJobs();
    // this.getJobComparison();
  }

  getUserInfo() {
    axios.get('/api/findUser', {
      params: {
        userId: this.props.userId,
      },
    })
      .then((result) => {
        const { data } = result;
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          githubUsername: data.githubUsername,
          resume: data.resumeURL || '',
        });
      })
      .catch(err => console.log('error getting user data', err));
  }

  getJobs() {
    axios.get('/api/jobs', {
      params: {
        userId: this.props.userId,
      },
    })
      .then(savedJobs => {
        this.setState({
          savedJobs: savedJobs.data,
        });
      })
      .catch(err => console.error(err));
  }

  // can possibly refactor to only use getJobComparison
  getJobComparison(jobId) {
    axios.get('/api/comparison', {
      params: {
        userId: this.props.userId,
      },
    })
      .then((result) => {
        let missing = [];
        const { data } = result;
        const { userSkills, jobs } = data;
        jobs.map((job) => {
          job.missingSkills = job.skills.filter(skill => userSkills.indexOf(skill) === -1);
          return job;
        });
        const currentJob = jobs.filter(job => { return jobId === job.jobId; });
        if (currentJob.length > 0) {
          missing = currentJob[0].missingSkills.slice(0, 3);
        } else if (jobs.length > 0) {
          missing = jobs[jobs.length - 1].missingSkills.slice(0, 3);
        } else {
          missing = [];
        }
        // if (jobs[0]) {
        //   missing = jobs[0].missingSkills;
        // }
        this.setState({
          userSkills,
          missingSkills: missing,
        });
      });
  }

  addJob(job) {
    fetch('/api/job', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    }).then(res => res.json())
      .then((data) => {
        console.log('job add', data);
        this.getJobs();
        this.getJobComparison(data.jobId);
      });
  }

  deleteJob(jobId) {
    const jobs = this.state.savedJobs.filter(job => job.jobId !== jobId);
    this.setState({
      savedJobs: jobs,
    });
    axios.put('/api/job/delete', { jobId });
    this.getJobComparison();
  }

  clearResume() {
    this.setState({ resume: '' });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/home/resume"
            render={() => (
              <Resume
                userId={this.props.userId}
                getJobComparison={this.getJobComparison}
                getUserInfo={this.getUserInfo}
                userResume={this.state.resume}
                clearResume={this.clearResume}
              />
            )}
          />
          <Route
            path="/home/resources"
            render={() => (
              <Resources
                userId={this.props.userId}
                missingSkills={this.state.missingSkills}
              />
            )}
          />
          <Route
            path="/home/searchjobs"
            render={() => (
              <SearchJobs
                userId={this.props.userId}
                getJobs={this.getJobs}
                addJob={this.addJob}
              />
            )}
          />
          <Route
            path="/home/profile"
            render={() => (
              <Profile
                userEmail={this.state.email}
                userFirstName={this.state.firstName}
                userLastName={this.state.lastName}
                userId={this.props.userId}
                githubUsername={this.state.githubUsername}
                getUserInfo={this.getUserInfo}
              />
            )}
          />
          <Route
            path="/home/dashboard/:id"
            component={JobHome}
          />
          <Route render={() => (
            <Dashboard
              userId={this.props.userId}
              getJobs={this.getJobs}
              savedJobs={this.state.savedJobs}
              deleteJob={this.deleteJob}
              getJobComparison={this.getJobComparison}
              addJob={this.addJob}
            />
           )}
          />
        </Switch>
      </div>
    );
  }
}

Main.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Main;
