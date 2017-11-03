import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon, Modal } from 'react-materialize';

class JobEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.company,
      jobTitle: this.props.jobTitle,
      status: this.props.status,
      dateApplied: this.props.dateApplied,
      location: this.props.location || '',
      url: this.props.url,
      skills: this.props.skills,
      companyUrl: this.props.companyUrl,
      notes: this.props.notes || '',
      successVisible: false,
    };
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDateApplied = this.onChangeDateApplied.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.submit = this.submit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.dismissSuccess = this.dismissSuccess.bind(this);
    this.onChangeCompanyUrl = this.onChangeCompanyUrl.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
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

  onChangeLocation(e) {
    this.setState({ location: e.target.value });
  }

  onChangeNotes(e) {
    this.setState({ notes: e.target.value });
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
      location: this.state.location,
      url: this.state.url,
      companyUrl: this.state.companyUrl,
      notes: this.state.notes,
    };
    fetch(`/api/jobs/${this.props.paramsId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    }).then(res => res.json())
      .then(data =>
        // this.showSuccess());
        Materialize.toast('Job application saved!', 4000));
  }

  render() {
    const success = (
      <div className="alert">
        The job record has been edited.
      </div>
    );

    return (
      <div>
        <Row>
          <Col s={12}>
            <div>Quick Actions</div>
            <Link className="waves-effect waves-light btn" to={`/home/dashboard/${this.props.jobId}/activity/new`}>Log Interview</Link>
            <span className="btn-space"><Link className="waves-effect waves-light btn" to={`/home/dashboard/${this.props.jobId}/contacts/new`}>Add Contact</Link></span>
          </Col>
        </Row>
        <form className="job-edit-form" onSubmit={this.submit}>
          <Row>
            <Col s={12}>
              <label htmlFor="url">
                Job URL:
                <input type="text" name="url" value={this.state.url} onChange={this.onChangeUrl} />
              </label>
            </Col>
            <Col s={6}>
              <label htmlFor="company">
                Company:
                <input type="text" name="company" value={this.state.company} onChange={this.onChangeCompany} />
              </label>
            </Col>
            <Col s={6}>
              <label htmlFor="jobTitle">
                Job Title:
                <input type="text" name="jobtitle" value={this.state.jobTitle} onChange={this.onChangeJobTitle} />
              </label>
            </Col>
            <Col s={6}>
              <label htmlFor="status">
                Status:
                <select id="status-select" className="browser-default" name="status" value={this.state.status} onChange={this.onChangeStatus}>
                  <option value="wishlist">Wishlist</option>
                  <option value="applied">Applied</option>
                  <option value="phone">Phone</option>
                  <option value="onSite">OnSite</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                </select>
              </label>
            </Col>
            <Col s={6}>
              <label htmlFor="dateApplied">
                Date Applied:
                <input type="date" name="dateApplied" value={this.state.dateApplied} onChange={this.onChangeDateApplied} />
              </label>
            </Col>
            <Col s={6}>
              <label htmlFor="location">
                Location:
                <input type="text" name="location" value={this.state.location} onChange={this.onChangeLocation} />
              </label>
            </Col>
            <Col s={6}>
              <label htmlFor="companyUrl">
                Company URL:
                <input type="text" name="companyUrl" value={this.state.companyUrl} onChange={this.onChangeCompanyUrl} />
              </label>
            </Col>
            <Col s={12}>
              <label htmlFor="skills">
                Required Skills:
                <textarea className="materialize-textarea" name="skills" value={this.state.skills} disabled />
              </label>
            </Col>
            <Col s={12}>
              <label htmlFor="notes">
                Notes:
                <textarea className="materialize-textarea" name="notes" value={this.state.notes} onChange={this.onChangeNotes} />
              </label>
            </Col>
          </Row>
          <Button type="submit">Save</Button>
          <span className="btn-space"><Link className="waves-effect waves-light btn" to="/home/dashboard">Back</Link></span>
        </form>
        {this.state.successVisible ? success : null}
      </div>
    );
  }
}
module.exports = JobEdit;
