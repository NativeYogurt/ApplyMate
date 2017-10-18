import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import SavedJobs from './SavedJobs';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successVisible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addJob = this.addJob.bind(this);
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
        console.log('post result', data);
        this.props.getJobs();
        this.props.getJobComparison();
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.jobAdd;
    this.addJob({
      company: form.company.value,
      jobTitle: form.jobtitle.value,
      status: form.status.value,
      dateApplied: form.dateApplied.value,
      url: form.url.value,
      skills: [],
      userId: this.props.userId,
    });
    // clear the form for the next input
    form.company.value = '';
    form.jobtitle.value = '';
    form.status.value = 'wishlist';
    form.url.value = '';
    this.setState({ successVisible: true });
  }
  render() {
    const success = (
      <div className="alert">
        The job has been added.
      </div>
    );
    const jobList = (
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Status</th>
            <th>Date Applied</th>
            <th>Job URL</th>
            <th>Required Skills</th>
          </tr>
        </thead>
        <tbody>
          {this.props.savedJobs.map((job, i) => {
            return (
              <SavedJobs key={job.jobId} jobPosting={job} deleteJob={this.props.deleteJob} />
            );
          })}
        </tbody>
      </table>
    );
    return (
      <div>
        <h2>New Job Application</h2>
        {this.state.successVisible ? success : null}
        <form name="jobAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="company" placeholder="company" />
          <input type="text" name="jobtitle" placeholder="job title" />
          <select defaultValue="wishlist" name="status">
            <option value="wishlist">Wishlist</option>
            <option value="applied">Applied</option>
            <option value="phone">Phone</option>
            <option value="onSite">OnSite</option>
            <option value="rejected">Rejected</option>
            <option value="offer">Offer</option>
          </select>
          <input type="date" name="dateApplied" placeholder="date applied" />
          <input type="text" name="url" placeholder="job url" />
          <input type="submit" value="Add" />
        </form>
        {this.props.savedJobs.length > 0 ? jobList : null}
      </div>);
  }
}
// <label htmlFor="company">
//   Company:
//   <input type="text" name="company" placeholder="company"/>
// </label>
// <br />
// <label htmlFor="jobtitle">
//   Job Title:
//   <input type="text" name="jobtitle" />
// </label>
// <br />
// <label htmlFor="description">
//   Description:
//   <textarea name="description" />
// </label>
// <br />
// <label htmlFor="url">
//   URL:
//   <input type="text" name="url" />
// </label>
// <br />
// <input type="submit" value="Add" />
Dashboard.propTypes = {
  getJobs: PropTypes.func.isRequired,
  getJobComparison: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  savedJobs: PropTypes.array.isRequired,
  deleteJob: PropTypes.func.isRequired,
};
export default Dashboard;
