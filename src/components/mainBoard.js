import React from 'react';
import { HashRouter, browserHistory, Route, Redirect, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import axios from 'axios';

import Dashboard from './dashboard/dashboard';
import Resources from './resources/resources';
import Profile from './profile/profile';
import Resume from './profile/resume';
import Password from './profile/password';
import Analytics from './analytics/analytics';
import SearchJobs from './job-search/SearchJobs';
import JobHome from './dashboard/job-details/JobHome';
import Tasks from './tasks/tasks';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      githubUsername: '',
      githubSkills: {},
      savedJobs: [],
      userResume: '',
      userSkills: [],
      missingSkills: [],
      emailReminder: '',
      verifiedEmail: '',
      phoneNumber: '',
      textReminder: '',
      jobSearchResults: [],
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.getJobComparison = this.getJobComparison.bind(this);
    this.addJob = this.addJob.bind(this);
    this.clearResume = this.clearResume.bind(this);
    this.favoriteJob = this.favoriteJob.bind(this);
    this.revertJobUrlToActive = this.revertJobUrlToActive.bind(this);
    this.searchJobs = this.searchJobs.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.getJobs();
  }

  getUserInfo() {
    axios.get('/api/findUser', {
      params: {
        userId: this.props.userId,
      },
    })
      .then((result) => {
        const { data } = result;
        console.log('verifiedEmail', data.verifiedEmail)
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          githubUsername: data.githubUsername,
          githubSkills: data.githubSkills,
          userResume: data.resumeURL || '',
          emailReminder: data.emailReminder,
          verifiedEmail: data.verifiedEmail,
          phoneNumber: data.phoneNumber,
          textReminder: data.textReminder,
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
        this.setState({
          userSkills,
          missingSkills: missing,
        });
      });
  }

  addJob(job) {
    axios.post('/api/job', job)
      .then((data) => {
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

  favoriteJob(jobId) {
    let favoriteStatus = '';
    const jobs = this.state.savedJobs.map(job => {
      if (job.jobId === jobId) {
        job.favorite = !job.favorite;
        favoriteStatus = job.favorite
      }
      return job;
    });
    this.setState({
      savedJobs: jobs,
    });
    axios.put('/api/job/favorite', {
      jobId,
      favoriteStatus,
    });
  }

  revertJobUrlToActive(jobId) {
    let jobs = this.state.savedJobs.map(job => {
      if (job.jobId === jobId) {
        job.activeJobPosting = true;
      }
      return job
    })
    this.setState({
      savedJobs: jobs,
    });
    axios.put('/api/job/updateScreenshot', { jobId });
  }

  clearResume() {
    this.setState({ userResume: '' });
  }

  searchJobs(desc, loc) {
    const link = `https://jobs.github.com/positions.json?description=${desc}&location=${loc}`;
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: link,
      success: data => {
        this.setState({
          jobSearchResults: data,
        });
      },
      error: error => {
        console.error('failed to search job', error);
      },
    });
  }

  render() {
    return (
      <Switch>
        <Route
          path="/home/analytics"
          render={() => (
            <Analytics
              savedJobs={this.state.savedJobs}
              githubSkills={this.state.githubSkills}
              userId={this.props.userId}
            />
          )}
        />
        <Route
          path="/home/tasks"
          render={() => (
            <Tasks
              userId={this.props.userId}
              savedJobs={this.state.savedJobs}
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
              jobSearchResults={this.state.jobSearchResults}
              searchJobs={this.searchJobs}
            />
          )}
        />
        <Route
          path="/home/profile/resume"
          render={() => (
            <Resume
              userId={this.props.userId}
              getJobComparison={this.getJobComparison}
              getUserInfo={this.getUserInfo}
              userResume={this.state.userResume}
              clearResume={this.clearResume}
            />
          )}
        />
        <Route
          path="/home/profile/password"
          render={() => (
            <Password
              userId={this.props.userId}
            />
          )}
        />
        <Route
          path="/home/profile"
          render={() => (
            <Profile
              userId={this.props.userId}
              userFirstName={this.state.firstName}
              userLastName={this.state.lastName}
              userEmail={this.state.email}
              userResume={this.state.userResume}
              githubUsername={this.state.githubUsername}
              githubSkills={this.state.githubSkills}
              getJobComparison={this.getJobComparison}
              getUserInfo={this.getUserInfo}
              clearResume={this.clearResume}
              emailReminder={this.state.emailReminder}
              verifiedEmail={this.state.verifiedEmail}
              phoneNumber={this.state.phoneNumber}
              textReminder={this.state.textReminder}
            />
          )}
        />
        <Route
          path="/home/dashboard/:id"
          component={JobHome}
        />
        <Route
          render={() => (
            <Dashboard
              userId={this.props.userId}
              getJobs={this.getJobs}
              revertJobUrlToActive={this.revertJobUrlToActive}
              savedJobs={this.state.savedJobs}
              deleteJob={this.deleteJob}
              favoriteJob={this.favoriteJob}
              getJobComparison={this.getJobComparison}
              addJob={this.addJob}
            />
         )}
        />
      </Switch>
    );
  }
}

Main.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Main;
