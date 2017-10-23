import React from 'react';

class ContactEdit extends React.Component {
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
    this.loadContact = this.loadContact.bind(this);
  }
  componentDidMount() {
    this.loadContact();
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
  loadContact() {
    fetch(`/api/contacts/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          jobTitle: data.jobTitle,
          email: data.email,
          linkedInProfile: data.linkedInProfile,
          workPhone: data.workPhone,
          personalPhone: data.personalPhone,
          howWeMet: data.howWeMet,
          notes: data.notes,
        });
      });
  }
  submit(e) {
    e.preventDefault();
    const contact = {
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

    fetch(`/api/contacts/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    }).then(res => res.json())
      .then(data =>
        console.log('contact edited', data));
  }
  render() {
    return (
      <div>
        <form className="contact-form" onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="firstname">
              <span className="input-label">First Name</span>
              <input className="contact-first-name" type="text" name="firstName" value={this.state.firstName} onChange={this.onChangeFirstName} />
            </label>
            <label htmlFor="lastname">
              <span className="input-label">Last Name</span>
              <input className="contact-last-name" type="text" name="lastName" value={this.state.lastName} onChange={this.onChangeLastName} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="jobtitle">
              <span className="input-label">Job Title</span>
              <input type="text" name="jobtitle" value={this.state.jobTitle} onChange={this.onChangeJobTitle} />
            </label>
            <label htmlFor="email">
              <span className="input-label">Email</span>
              <input type="text" name="email" value={this.state.email} onChange={this.onChangeEmail} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="linkedInProfile">
              <span className="input-label">LinkedIn Profile</span>
              <input type="text" name="linkedInProfile" value={this.state.linkedInProfile} onChange={this.onChangeLinkedInProfile} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="workPhone">
              <span className="input-label">Work Phone</span>
              <input type="text" name="workPhone" value={this.state.workPhone} onChange={this.onChangeWorkPhone} />
            </label>
            <label htmlFor="personalPhone">
              <span className="input-label">Personal Phone</span>
              <input type="text" name="personalPhone" value={this.state.personalPhone} onChange={this.onChangePersonalPhone} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="howWeMet">
              <span className="input-label">How We Met</span>
              <textarea name="howWeMet" value={this.state.howWeMet} onChange={this.onChangeHowWeMet} />
            </label>
            <label htmlFor="notes">
              <span className="input-label">Notes</span>
              <textarea name="notes" value={this.state.notes} onChange={this.onChangeNotes} />
            </label>
          </div>
          <div className="form-group">
            <input className="button" type="submit" value="Save" />
          </div>
        </form>
      </div>
    );
  }
}
export default ContactEdit;
