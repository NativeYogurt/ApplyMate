import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Error from './errorBanner';
import SavedJobs from './SavedJobs';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successVisible: false,
      sortBy: 'status',
      errorMessage: null,
      search: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeSortBy = this.onChangeSortBy.bind(this);
    this.createJobs = this.createJobs.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }
  componentDidMount() {
    this.props.getJobs();
  }
  onChangeSortBy(e) {
    this.setState({ sortBy: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.jobAdd;
    if (!form.company.value) {
      this.setState({
        errorMessage: 'Please Add a Company Name',
      });
      return;
    }
    if (!form.jobtitle.value) {
      this.setState({
        errorMessage: 'Please Add a Job Title',
      });
      return;
    }
    if (!form.url.value) {
      this.setState({
        errorMessage: 'Please Add a Job URL',
      });
      return;
    }
    this.props.addJob({
      company: form.company.value,
      jobTitle: form.jobtitle.value,
      status: form.status.value,
      dateApplied: form.dateApplied.value || null,
      location: form.location.value,
      url: form.url.value,
      companyUrl: form.companyUrl.value,
      skills: [],
      userId: this.props.userId,
    });
    // clear the form for the next input
    form.company.value = '';
    form.jobtitle.value = '';
    form.status.value = 'wishlist';
    form.dateApplied.value = '';
    form.location.value = '';
    form.url.value = '';
    form.companyUrl.value = '';
    this.setState({
      successVisible: true,
      errorMessage: null,
    });
  }
  createJobs(job) {
    return (
      <SavedJobs
        key={job.jobId}
        jobPosting={job}
        deleteJob={this.props.deleteJob}
        favoriteJob={this.props.favoriteJob}
        getJobs={this.props.getJobs}
        getJobComparison={this.props.getJobComparison}
      />
    );
  }
  updateSearch(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
  }
  render() {
    const success = (
      <div className="alert">
        The job has been added.
      </div>
    );
    const filteredJobs = this.props.savedJobs.filter(job => {
      return job.company.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    const sortedByStatus = [].concat(filteredJobs).sort((a, b) =>
      a.status < b.status).map(this.createJobs);
    const sortedByDate = [].concat(filteredJobs).sort((a, b) => {
      return a.dateApplied - b.dateApplied;
    }).reverse().map(this.createJobs);
    const sortedByFavorite = [].concat(filteredJobs).sort((a, b) => {
      if (a.favorite) {
        return 1;
      }
      return -1;
    }).reverse().map(this.createJobs);
    const sortedByLocation = [].concat(filteredJobs).sort((a, b) =>
      a.location > b.location).map(this.createJobs);

    let listJobs = null;
    if (this.state.sortBy === 'status') {
      listJobs = sortedByStatus;
    } else if (this.state.sortBy === 'favorite') {
      listJobs = sortedByFavorite;
    } else if (this.state.sortBy === 'location') {
      listJobs = sortedByLocation;
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
            <option value="favorite">Favorites</option>
            <option value="location">Location</option>
          </select>
          <span className="search-input" >
            <input type="text" value={this.state.search} onChange={this.updateSearch} placeholder="Search Company" />
          </span>
        </div>
        <table className="dashboard">
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Location</th>
              <th>Job Posting URL</th>
              <th>Required Skills</th>
              <th>Favorite</th>
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
        <Error error={this.state.errorMessage} />
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
            <input type="text" name="location" placeholder="job location" />
          </span>
          <span className="form-group">
            <input type="text" name="url" placeholder="job url" />
          </span>
          <span className="form-group">
            <input type="text" name="companyUrl" placeholder="company url" />
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
  addJob: PropTypes.func.isRequired,
};
export default Dashboard;
