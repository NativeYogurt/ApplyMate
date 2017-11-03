import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Button, Input, Parallax } from 'react-materialize';

import JobSearchResult from './JobSearchResult';

class SearchJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.searchJobs = this.searchJobs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJobAdd = this.handleJobAdd.bind(this);
  }
  // searchJobs(desc, loc) {
  //   const link = `https://jobs.github.com/positions.json?description=${desc}&location=${loc}`;
  //   $.ajax({
  //     type: 'GET',
  //     dataType: 'jsonp',
  //     url: link,
  //     success: data => {
  //       this.setState({
  //         jobSearchResults: data,
  //       });
  //     },
  //     error: error => {
  //       console.error('failed to search job', error);
  //     },
  //   });
  // }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.jobSearch;
    this.props.searchJobs(
      form.searchTechSkill.value,
      form.searchJobLocation.value,
    );
  }
  handleJobAdd(job) {
    this.props.addJob({
      company: job.company,
      jobTitle: job.title,
      status: 'wishlist',
      location: job.location,
      url: job.url,
      skills: [],
      companyUrl: job.company_url,
      userId: this.props.userId,
    });
  }
  render() {
    return (
      <div className="bg-job">
        <Parallax imageSrc="/imgs/jobSearchBG.jpeg" />
        <div className="job-search-inputs">
          <h4>Jobs. All day.</h4>
          <h5>Go get them!</h5>
          <form className="job-search-form" name="jobSearch" onSubmit={this.handleSubmit}>
            <Row>
              <Col s={2} offset="s4">
                <Input label="Technical Skill Required" type="text" name="searchTechSkill" />
              </Col>
              <Col s={2}>
                <Input label="Location" type="text" name="searchJobLocation" />
              </Col>
            </Row>
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="job-search-results">
          <Row>
            {this.props.jobSearchResults.length > 0 ? this.props.jobSearchResults.map(job => {
              return (
                <JobSearchResult
                  key={job.id}
                  job={job}
                  handleJobAdd={this.handleJobAdd}
                />
              );
            }) : null}
          </Row>
        </div>
        <Parallax imageSrc="/imgs/jobSearchBG.jpeg" />
      </div>
    );
  }
}
// {this.state.jobSearchResults.length > 0 ? <h5>Job Search Results</h5> : null}

export default SearchJobs;
