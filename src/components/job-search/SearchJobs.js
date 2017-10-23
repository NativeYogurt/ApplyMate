import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import axios from 'axios';
import JobSearchResult from './JobSearchResult';

class SearchJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobSearchResults: [],
    };
    this.searchJobs = this.searchJobs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJobAdd = this.handleJobAdd.bind(this);
    this.fixURL = this.fixURL.bind(this);
    this.isURL = this.isURL.bind(this);
    this.findCompanyURL = this.findCompanyURL.bind(this);
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
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.jobSearch;
    this.searchJobs(
      form.searchTechSkill.value,
      form.searchJobLocation.value,
    );
  }
  handleJobAdd(job) {
    console.log('job', job);
    let companyUrl = this.fixURL(job.company_url)
    console.log(1, companyUrl)
    console.log(2, this.isURL(companyUrl))
    if (!(this.isURL(companyUrl))) {
      this.findCompanyURL(job.company, (fixedCompanyURL) => {
        console.log(3, fixedCompanyURL);
        this.props.addJob({
          company: job.company,
          jobTitle: job.title,
          status: 'wishlist',
          url: job.url,
          skills: [],
          companyUrl: fixedCompanyURL,
          userId: this.props.userId,
        });
      });
    } else {
      this.props.addJob({
        company: job.company,
        jobTitle: job.title,
        status: 'wishlist',
        url: job.url,
        skills: [],
        companyUrl,
        userId: this.props.userId,
      });
    }
  }
  fixURL(url) {
    console.log(this.state.undefined)
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
    return url;
  }
  isURL(url) {
    console.log(this.state.undefined)
    const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
        + '(([0-9]{1,3}\.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
        + '|' // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' // 二级域名
        + '[a-z]{2,6})' // first level domain- .com or .museum
        + '(:[0-9]{1,4})?' // 端口- :80
        + '((/?)|' // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    const re = new RegExp(strRegex);
    return re.test(url);
  }
  findCompanyURL(companyName, cb) {
    axios.post('/api/getCompanyUrl', { searchTerm: companyName })
      .then(results => {
        let URL = results.data;
        URL = this.fixURL(URL);
        console.log(4, URL);
        cb(URL);
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
                <span className="input-label">Tech Skill Required:</span>
                <input type="text" name="searchTechSkill" placeholder="JavaScript" />
              </label>
            </span>
            <span className="form-group">
              <label htmlFor="searchJobLocation">
                <span className="input-label">Job Location:</span>
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
            return (<JobSearchResult key={job.id} job={job} handleJobAdd={this.handleJobAdd} />);
          }) : null}
        </div>
      </div>
    );
  }
}

export default SearchJobs;
