import React from 'react';
import { Row, Col, Icon, Button, Input } from 'react-materialize';
import { Link, HashHistory } from 'react-router-dom';

import Error from '../../errorBanner';

class ContactAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      jobTitle: '',
      email: '',
      linkedInProfile: '',
      workPhone: '',
      personalPhone: '',
      howWeMet: '',
      notes: '',
      errorMessage: null,
    };
    this.submit = this.submit.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeLinkedInProfile = this.onChangeLinkedInProfile.bind(this);
    this.onChangeWorkPhone = this.onChangeWorkPhone.bind(this);
    this.onChangePersonalPhone = this.onChangePersonalPhone.bind(this);
    this.onChangeHowWeMet = this.onChangeHowWeMet.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
  }
  onChangeFirstName(e) {
    this.setState({ firstName: e.target.value });
  }
  onChangeLastName(e) {
    this.setState({ lastName: e.target.value });
  }
  onChangeJobTitle(e) {
    this.setState({ jobTitle: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangeLinkedInProfile(e) {
    this.setState({ linkedInProfile: e.target.value });
  }
  onChangeWorkPhone(e) {
    this.setState({ workPhone: e.target.value });
  }
  onChangePersonalPhone(e) {
    this.setState({ personalPhone: e.target.value });
  }
  onChangeHowWeMet(e) {
    this.setState({ howWeMet: e.target.value });
  }
  onChangeNotes(e) {
    this.setState({ notes: e.target.value });
  }
  submit(e) {
    e.preventDefault();
    if (!this.state.firstName && !this.state.lastName) {
      this.setState({
        errorMessage: 'Please enter first or last name',
      });
      return;
    }
    const newContact = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      jobTitle: this.state.jobTitle,
      email: this.state.email,
      linkedInProfile: this.state.linkedInProfile,
      workPhone: this.state.workPhone,
      personalPhone: this.state.personalPhone,
      howWeMet: this.state.howWeMet,
      notes: this.state.notes,
      jobId: this.props.jobId,
    };

    fetch('/api/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    }).then(res => res.json())
      .then((data) => {
        this.setState({
          firstName: '',
          lastName: '',
          jobTitle: '',
          email: '',
          linkedInProfile: '',
          workPhone: '',
          personalPhone: '',
          howWeMet: '',
          notes: '',
          errorMessage: null,
        });
        window.history.back();
      });
  }
  render() {
    return (
      <div>
        <form className="contact-form" onSubmit={this.submit}>
          <Row>
            <Input s={6} label="First Name" type="text" name="firstName" value={this.state.firstName} onChange={this.onChangeFirstName} />
            <Input s={6} label="Last Name" type="text" name="lastName" value={this.state.lastName} onChange={this.onChangeLastName} />
            <Input s={6} label="Job Title" type="text" name="jobtitle" value={this.state.jobTitle} onChange={this.onChangeJobTitle} />
            <Input s={6} label="Email" type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} />
            <Input s={12} label="LinkedIn Profile" type="text" name="linkedInProfile" value={this.state.linkedInProfile} onChange={this.onChangeLinkedInProfile} />
            <Input s={6} label="Work Phone" type="text" name="workPhone" value={this.state.workPhone} onChange={this.onChangeWorkPhone} />
            <Input s={6} label="Personal Phone" type="text" name="personalPhone" value={this.state.personalPhone} onChange={this.onChangePersonalPhone} />
            <Col s={6}>
              <label htmlFor="howWeMet">
                How We Met
                <textarea className="materialize-textarea" name="howWeMet" value={this.state.howWeMet} onChange={this.onChangeHowWeMet} />
              </label>
            </Col>
            <Col s={6}>
              <label htmlFor="notes">
                Notes
                <textarea className="materialize-textarea" name="notes" value={this.state.notes} onChange={this.onChangeNotes} />
              </label>
            </Col>
          </Row>
          <Button type="submit">Save</Button>
          <span className="btn-space">
            <Link className="waves-effect waves-light btn" to={`/home/dashboard/${this.props.jobId}/contacts`}>Cancel</Link>
          </span>
        </form>
        <Error error={this.state.errorMessage} />
      </div>
    );
  }
}
export default ContactAdd;
