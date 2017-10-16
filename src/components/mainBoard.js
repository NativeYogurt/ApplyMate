import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Dashboard from './dashboard';
import Resume from './resume';
import Resources from './resources';
import Profile from './Profile';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      savedJobs: [],
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
  }


  componentDidMount() {
    this.getUserInfo();
    this.getJobs();
  }
  getUserInfo() {
    fetch('/api/findUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: this.props.userId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      })
      .catch(error => console.log('error getting data'));
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
  deleteJob(jobId) {
    const jobs = this.state.savedJobs.filter(job => job.jobId !== jobId);
    this.setState({
      savedJobs: jobs,
    });
    axios.put('/api/job/delete', { jobId });
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home/resume" render={() => (<Resume userId={this.props.userId} />)} />
          <Route path="/home/resources" render={() => (<Resources userId={this.props.userId} resources={this.state.resources} />)} />
          <Route path="/home/profile" render={() => (<Profile userEmail={this.state.email} userFirstName={this.state.firstName} userLastName={this.state.lastName} userId={this.props.userId} getUserInfo={this.getUserInfo} />)} />
          <Route render={() => (<Dashboard userId={this.props.userId} getJobs={this.getJobs} savedJobs={this.state.savedJobs} deleteJob={this.deleteJob} />)} />
        </Switch>
      </div>
    );
  }
}
Main.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default Main;
