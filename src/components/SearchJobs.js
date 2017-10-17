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
  }
  searchJobs(desc, loc) {
    const link = "https://jobs.github.com/positions.json?description=" + desc + "&location=" + loc;
    console.log(link);
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: link,
      success: data => {
        console.log(data);
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
          return (<JobSearchResult key={job.id} job={job} />);
        }) : null}
      </div>
    );
  }
}

export default SearchJobs;
