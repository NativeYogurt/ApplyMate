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
      description: job.company_url,
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
      <div className="Job-search-results">
        <h2>Jobs. All day.</h2>
        <h3>Go get them!</h3>
        <form name="jobSearch" onSubmit={this.handleSubmit}>
          <label htmlFor="searchTerm">
            Tech Skill Required:
            <input type="text" name="searchTechSkill" placeholder="JavaScript" />
          </label>
          <br />
          <label htmlFor="searchJobLocation">
            Job Location:
            <input type="text" name="searchJobLocation" placeholder="SanFrancisco" />
          </label>
          <br />
          <input type="submit" value="Search" />
        </form>
        <h2>Job Search Results</h2>
        {this.state.jobSearchResults.length > 0 ? this.state.jobSearchResults.map(job => {
          return (<JobSearchResult key={job.id} job={job} addJob={this.addJob} />);
        }) : null}
      </div>
    );
  }
}

export default SearchJobs;
