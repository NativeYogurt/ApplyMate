import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, Icon } from 'react-materialize';

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
        <div>
          <div>Quick Actions</div>
          <span className="quick-actions"><Link to="/home/dashboard/job/activity/new">Log Interview</Link></span>
          <span className="quick-actions"><Link to="/home/dashboard/job/contacts/new">Add Contact</Link></span>
        </div>
        <form className="job-edit-form" onSubmit={this.submit}>
          <Row>
            <Input s={12} label="Job URL:" type="text" name="url" value={this.state.url} onChange={this.onChangeUrl} />
            <Input s={6} label="Company:" type="text" name="company" value={this.state.company} onChange={this.onChangeCompany} />
            <Input s={6} label="Job Title:" type="text" name="jobtitle" value={this.state.jobTitle} onChange={this.onChangeJobTitle} />
            <Input s={6} type="select" name="status" label="Status" value={this.state.status} onChange={this.onChangeStatus}>
              <option value="wishlist">Wishlist</option>
              <option value="applied">Applied</option>
              <option value="phone">Phone</option>
              <option value="onSite">OnSite</option>
              <option value="rejected">Rejected</option>
              <option value="offer">Offer</option>
            </Input>
            <Input s={6} label="Date Applied:" type="date" name="dateApplied" value={this.state.dateApplied} onChange={this.onChangeDateApplied} />
            <Input s={6} label="Location:" type="text" name="location" value={this.state.location} onChange={this.onChangeLocation} />
            <Input s={6} label="Company URL:" type="text" name="companyUrl" value={this.state.companyUrl} onChange={this.onChangeCompanyUrl} />
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
          <Link className="button" to="/home/dashboard">Back</Link>
        </form>
        {this.state.successVisible ? success : null}
      </div>
    );
  }
}
// <Col s={1}>
//   <a href={this.state.url} target="_blank"><Icon>directions_run</Icon></a>
// </Col>
module.exports = JobEdit;
