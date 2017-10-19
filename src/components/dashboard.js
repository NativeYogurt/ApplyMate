import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import SavedJobs from './SavedJobs';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successVisible: false,
      sortBy: 'status',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeSortBy = this.onChangeSortBy.bind(this);
    this.createJobs = this.createJobs.bind(this);
  }

  onChangeSortBy(e) {
    this.setState({ sortBy: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.jobAdd;
    console.log('date', form.dateApplied.value);
    this.props.addJob({
      company: form.company.value,
      jobTitle: form.jobtitle.value,
      status: form.status.value,
      dateApplied: form.dateApplied.value || null,
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
  createJobs(job) {
    return (
      <SavedJobs key={job.jobId} jobPosting={job} deleteJob={this.props.deleteJob} getJobComparison={this.props.getJobComparison} />
    );
  }
  render() {
    const success = (
      <div className="alert">
        The job has been added.
      </div>
    );
    const sortedByStatus = [].concat(this.props.savedJobs).sort((a, b) =>
      a.status < b.status).map(this.createJobs);
    const sortedByDate = [].concat(this.props.savedJobs).sort((a, b) => {
      return a.dateApplied - b.dateApplied;
    }).reverse().map(this.createJobs);
    let listJobs = null;
    if (this.state.sortBy === 'status') {
      listJobs = sortedByStatus;
    } else {
      listJobs = sortedByDate;
    }
    const jobList = (
      <div>
        <div>
          <span className="input-label">Sort By</span>
          <select value={this.state.sortBy} onChange={this.onChangeSortBy}>
            <option value="status">Status</option>
            <option value="dateApplied">DateApplied</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Job Post</th>
              <th>Required Skills</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {listJobs}
          </tbody>
        </table>
      </div>
    );
    return (
      <div>
        <h2>New Job Application</h2>
        {this.state.successVisible ? success : null}
        <form className="job-add-form" name="jobAdd" onSubmit={this.handleSubmit}>
          <span className="form-group">
            <input type="text" name="company" placeholder="company" />
          </span>
          <span className="form-group">
            <input type="text" name="jobtitle" placeholder="job title" />
          </span>
          <span className="form-group">
            <select defaultValue="wishlist" name="status">
              <option value="wishlist">Wishlist</option>
              <option value="applied">Applied</option>
              <option value="phone">Phone</option>
              <option value="onSite">OnSite</option>
              <option value="rejected">Rejected</option>
              <option value="offer">Offer</option>
            </select>
          </span>
          <span className="form-group">
            <input type="date" name="dateApplied" placeholder="date applied" />
          </span>
          <span className="form-group">
            <input type="text" name="url" placeholder="job url" />
          </span>
          <span className="form-group">
            <input className="button" type="submit" value="Add" />
          </span>
        </form>
        {this.props.savedJobs.length > 0 ? jobList : null}
      </div>);
  }
}
Dashboard.propTypes = {
  getJobs: PropTypes.func.isRequired,
  getJobComparison: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  savedJobs: PropTypes.array.isRequired,
  deleteJob: PropTypes.func.isRequired,
};
export default Dashboard;
