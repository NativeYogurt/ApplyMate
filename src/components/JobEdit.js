import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import CompanyInfo from './CompanyInfo';

class JobEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      jobTitle: '',
      status: '',
      dateApplied: '',
      url: '',
      skills: [],
      companyUrl: '',
      successVisible: false,
      companyInfo: null,
    };
    this.loadData = this.loadData.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDateApplied = this.onChangeDateApplied.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.submit = this.submit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.dismissSuccess = this.dismissSuccess.bind(this);
    this.loadCompanyInfo = this.loadCompanyInfo.bind(this);
    this.onChangeCompanyUrl = this.onChangeCompanyUrl.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id != prevProps.match.params.id) {
      this.loadData();
    }
  }

  onChangeCompany(e) {
    this.setState({ company: e.target.value });
  }

  onChangeJobTitle(e) {
    this.setState({ jobTitle: e.target.value });
  }
  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }

  onChangeDateApplied(e) {
    this.setState({ dateApplied: e.target.value });
  }

  onChangeUrl(e) {
    this.setState({ url: e.target.value });
  }

  onChangeCompanyUrl(e) {
    this.setState({ companyUrl: e.target.value });
  }
  loadData() {
    console.log('this props', this.props);
    fetch('/api/jobs/' + this.props.match.params.id)
      .then((res)=>res.json())
      .then(data=> {
        this.setState(data);
      })
      .then(() => {
        if (this.state.companyUrl !== null) {
          this.loadCompanyInfo(this.state.companyUrl);
        }
      });
  }

  loadCompanyInfo(company) {
    const link = `https://api.fullcontact.com/v2/company/lookup.json?domain=${company}&apiKey=${process.env.FULLCONTACT_APIKEY}`;
    // const link = `https://api.fullcontact.com/v2/company/lookup.json?domain=apple.com&apiKey=${process.env.FULLCONTACT_APIKEY}`;

    console.log('key', process.env.FULLCONTACT_APIKEY );
    console.log('link', link);
    $.ajax({
      type: 'GET',
      dataType: 'json',
      header: { 'X-FullContact-APIKey': process.env.FULLCONTACT_APIKEY },
      url: link,
      success: data => {
        console.log('company', data);
        this.setState({
          companyInfo: data,
        });
      },
      error: error => {
        console.error('failed to search job', error);
      }
    })
  }
  showSuccess() {
    this.setState({ successVisible: true });
  }

  dismissSuccess() {
    this.setState({ successVisible: false });
  }

  submit(e) {
    e.preventDefault();
    const job = {
      company: this.state.company,
      jobTitle: this.state.jobTitle,
      status: this.state.status,
      dateApplied: this.state.dateApplied,
      url: this.state.url,
      companyUrl: this.state.companyUrl,
    };

    fetch('/api/jobs/' + this.props.match.params.id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(job)
		}).then(res => res.json())
			.then(data =>
        this.showSuccess());
  }

  render() {
    const success = (
      <div className="alert">
        The job record has been edited.
      </div>
    );

    return (
      <div>
        <form className="job-edit-form" onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="company">
              <span className="input-label">Company:</span>
              <input type="text" name="company" value={this.state.company} onChange={this.onChangeCompany} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="jobtitle">
              <span className="input-label">Job Title:</span>
              <input type="text" name="jobtitle" value={this.state.jobTitle} onChange={this.onChangeJobTitle} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="status">
              <span className="input-label">Status:</span>
              <select name="status" value={this.state.status} onChange={this.onChangeStatus}>
                <option value="wishlist">Wishlist</option>
                <option value="applied">Applied</option>
                <option value="phone">Phone</option>
                <option value="onSite">OnSite</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="dateApplied">
              <span className="input-label">Date Applied:</span>
              <input type="date" name="dateApplied" value={this.state.dateApplied} onChange={this.onChangeDateApplied} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="url">
              <span className="input-label">Job URL:</span>
              <input type="text" name="url" value={this.state.url} onChange={this.onChangeUrl} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="companyUrl">
              <span className="input-label">Company URL:</span>
              <input type="text" name="companyUrl" value={this.state.companyUrl} onChange={this.onChangeCompanyUrl} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="skills">
              <span className="input-label">Required Skills:</span>
              <textarea name="skills" value={this.state.skills} disabled />
            </label>
          </div>
          <div className="form-group">
            <input className="button" type="submit" value="Save" />
            <span className="back-link">
              <Link className="button" to="/home/dashboard">Back</Link>
            </span>
          </div>
        </form>
        {this.state.successVisible ? success : null}
        {this.state.companyInfo ?
          <CompanyInfo companyInfo={this.state.companyInfo} /> : null
        }
      </div>
    );
  }
}

module.exports = JobEdit;
