import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import JobSearchResult from './JobSearchResult';

class SearchJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobSearchResults: [],
    };
    this.searchJobs = this.searchJobs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addJob = this.addJob.bind(this);
  }
  searchJobs(desc, loc) {
    const link = "https://jobs.github.com/positions.json?description=" + desc + "&location=" + loc;
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
      }
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.jobSearch;
    this.searchJobs(form.searchTechSkill.value,
      form.searchJobLocation.value
    );

  }
  addJob(job) {
    const newJob = {
      company: job.company,
      jobTitle: job.title,
      status: 'wishlist',
      url: job.how_to_apply.split('"')[1],
      skills: [],
      userId: this.props.userId,
    };
    fetch('/api/job', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    }).then(res => res.json())
      .then((data) => {
        console.log('post result', data);
        this.props.getJobs();
      });
  }
  render() {
    return (
      <div>
        <div className="job-search-inputs">
          <h2>Jobs. All day.</h2>
          <h3>Go get them!</h3>
          <form className="job-search-form" name="jobSearch" onSubmit={this.handleSubmit}>
            <span className="form-group">
              <label htmlFor="searchTerm">
                Tech Skill Required:&emsp;
                <input type="text" name="searchTechSkill" placeholder="JavaScript" />
              </label>
            </span>
            <span className="form-group">
              <label htmlFor="searchJobLocation">
                Job Location:&emsp;
                <input type="text" name="searchJobLocation" placeholder="SanFrancisco" />
              </label>
            </span>
            <span className="form-group">
              <input className="button" type="submit" value="Search" />
            </span>
          </form>
        </div>
        <div className="job-search-results">
          {this.state.jobSearchResults.length > 0 ? <h2>Job Search Results</h2> : null}
          {this.state.jobSearchResults.length > 0 ? this.state.jobSearchResults.map(job => {
            return (<JobSearchResult key={job.id} job={job} addJob={this.addJob} />);
          }) : null}
        </div>
      </div>
    );
  }
}

export default SearchJobs;
