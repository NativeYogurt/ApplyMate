import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Button, Input } from 'react-materialize';

import JobSearchResult from './JobSearchResult';

class SearchJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.searchJobs = this.searchJobs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJobAdd = this.handleJobAdd.bind(this);
    this.fixURL = this.fixURL.bind(this);
    this.isURL = this.isURL.bind(this);
    this.findCompanyURL = this.findCompanyURL.bind(this);
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
    if (!job.company_url) {
      this.findCompanyURL(job.company, (foundCompanyURL) => {
        this.props.addJob({
          company: job.company,
          jobTitle: job.title,
          status: 'wishlist',
          location: job.location,
          url: job.url,
          skills: [],
          companyUrl: foundCompanyURL,
          userId: this.props.userId,
        });
      });
    } else {
      const companyUrl = this.fixURL(job.company_url);
      if (!(this.isURL(companyUrl))) {
        this.findCompanyURL(job.company, (foundCompanyURL) => {
          this.props.addJob({
            company: job.company,
            jobTitle: job.title,
            status: 'wishlist',
            location: job.location,
            url: job.url,
            skills: [],
            companyUrl: foundCompanyURL,
            userId: this.props.userId,
          });
        });
      } else {
        this.props.addJob({
          company: job.company,
          jobTitle: job.title,
          status: 'wishlist',
          location: job.location,
          url: job.url,
          skills: [],
          companyUrl,
          userId: this.props.userId,
        });
      }
    }
  }
  fixURL(url) {
    if (url) {
      if (url.lastIndexOf('//') !== -1) {
        const int = url.lastIndexOf('//');
        url = url.slice(int + 2);
      }
      if (url.lastIndexOf('www.') !== -1) {
        const int = url.lastIndexOf('www.');
        url = url.slice(int + 4);
      }

      if (url.lastIndexOf('/') !== -1) {
        const int = url.lastIndexOf('/');
        url = url.slice(0, int);
      }
    }
    return url;
  }
  isURL(url) {
    const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
        + '(([0-9]{1,3}\.){3}[0-9]{1,3}'
        + '|'
        + "([0-9a-z_!~*'()-]+\.)*"
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.'
        + '[a-z]{2,6})'
        + '(:[0-9]{1,4})?'
        + '((/?)|'
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    const re = new RegExp(strRegex);
    return re.test(url);
  }
  findCompanyURL(companyName, cb) {
    axios.post('/api/getCompanyUrl', { searchTerm: companyName })
      .then(results => {
        let URL = results.data.BusinessURLs[0];
        URL = this.fixURL(URL);
        cb(URL);
      });
  }
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
// {this.state.jobSearchResults.length > 0 ? <h5>Job Search Results</h5> : null}

export default SearchJobs;
