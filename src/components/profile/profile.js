import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import PDF from 'react-pdf-js';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Input } from 'react-materialize';

import GithubSkills from './github-skills';
import Resume from './resume';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userFirstName,
      lastName: this.props.userLastName,
      email: this.props.userEmail,
      githubUsername: this.props.githubUsername,
      password1: '',
      password2: '',
      emailReminder: this.props.emailReminder,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword1 = this.onChangePassword1.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.onChangeGithubUsername = this.onChangeGithubUsername.bind(this);
    this.onChangeEmailReminder = this.onChangeEmailReminder.bind(this);
  }

  onChangeFirstName(e) {
    this.setState({ firstName: e.target.value });
  }

  onChangeLastName(e) {
    this.setState({ lastName: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeGithubUsername(e) {
    this.setState({ githubUsername: e.target.value });
  }

  onChangePassword1(e) {
    this.setState({ password1: e.target.value });
  }

  onChangePassword2(e) {
    this.setState({ password2: e.target.value });
  }

  onChangeEmailReminder(e) {
    this.setState({ emailReminder: e.target.value }, () => console.log(this.state.emailReminder));
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.updateUser;
    this.setState({
      firstName: form.firstName.value || this.state.firstName,
      lastName: form.lastName.value || this.state.lastName,
      email: form.email.value || this.state.email,
      emailReminder: this.state.emailReminder,
    }, () => this.updateUser());
    // clear the form for the next input
    form.firstName.value = '';
    form.lastName.value = '';
    form.email.value = '';
  }

  updateUser() {
    firebase.auth().currentUser.updateEmail(this.state.email)
      .catch(err => alert(err));
    axios.put('api/updateUser/', {
      userId: this.props.userId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      emailReminder: this.state.emailReminder,
    })
      .then((data) => {
        alert('User has been updated!');
        this.props.getUserInfo();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handlePasswordSubmit(e) {
    e.preventDefault();
    if (this.state.password1 === this.state.password2) {
      this.updatePassword();
    } else alert('Passwords do not match');
  }

  updatePassword() {
    firebase.auth().currentUser.updatePassword(this.state.password1)
      .catch(err => alert(err));
  }

  render() {
    const username = `${this.props.userFirstName} ${this.props.userLastName}`;
    const githubSkills = `${this.props.githubSkills}`;
    const emailReminderRadioButtons = (this.state.emailReminder === true) ?
      (<label htmlFor="emailReminder">
        Interview Email Reminder:
        <Input label="On" type="radio" name="emailReminder" value="true" defaultChecked="checked" onClick={this.onChangeEmailReminder} />
        <Input label="Off" type="radio" name="emailReminder" value="false" onClick={this.onChangeEmailReminder} />
       </label>) :
      (<label htmlFor="emailReminder">
        Interview Email Reminder:
        <Input label="On" type="radio" name="emailReminder" value="true" onClick={this.onChangeEmailReminder} />
        <Input label="Off" type="radio" name="emailReminder" value="false" defaultChecked="checked" onClick={this.onChangeEmailReminder} />
       </label>);

    return (
      <div className="container">
        <h5>Hello, {this.state.githubUsername || username}!</h5>
        <br />
        <strong>Update Your Info</strong><br />
        <form name="updateUser" onSubmit={this.handleSubmit}>
          <Row>
            <Col s={6}>
              <label htmlFor="firstName">
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChangeFirstName} />
              </label>
            </Col>
            <Col s={6}>
              <label htmlFor="lastName">
                <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChangeLastName} />
              </label>
            </Col>
            <Col s={12}>
              <label htmlFor="email">
                <input type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} />
              </label>
            </Col>
          </Row>
          <br />
          {emailReminderRadioButtons}
          <br />
          Github Username: {this.state.githubUsername}
          <br />
          <Button type="submit">Submit</Button>
        </form>
        <br />
        <b>Change Password</b>
        <form name="changePassword" onSubmit={this.handlePasswordSubmit}>
          <Row>
            <Input s={6} label="New Password:" type="password" onChange={this.onChangePassword1} />
            <Input s={6} label="Verify Password:" type="password" onChange={this.onChangePassword2} />
          </Row>
          <Button type="submit">Change Password</Button>
        </form>
        <hr />
        <Resume
          userId={this.props.userId}
          getJobComparison={this.props.getJobComparison}
          getUserInfo={this.props.getUserInfo}
          userResume={this.props.userResume}
          clearResume={this.props.clearResume}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userEmail: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  userFirstName: 'Enter First Name',
  userLastName: 'Enter Last Name',
};

export default Profile;
