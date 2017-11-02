import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import PDF from 'react-pdf-js';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Input } from 'react-materialize';

import GithubSkills from './github-skills';
import Resume from './resume';
import ProfileNav from './profile-nav';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userFirstName || '',
      lastName: this.props.userLastName || '',
      email: this.props.userEmail || '',
      password1: '',
      password2: '',
      emailReminder: this.props.emailReminder,
      phoneNumber: this.props.phoneNumber || 2125551234,
      textReminder: this.props.phoneReminder,
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
    this.onChangeEmailReminder = this.onChangeEmailReminder.bind(this);
    this.sendEmailVerification = this.sendEmailVerification.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeTextReminder = this.onChangeTextReminder.bind(this);
  }

  componentWillMount() {
    const checkUserEmailVerification = async () => {
      await firebase.auth().currentUser.reload();
      const fireBaseUser = firebase.auth().currentUser;
      if (fireBaseUser.emailVerified === true && this.props.verifiedEmail === false) {
        const update = axios.put('/api/updateEmailValidation', {
          userId: fireBaseUser.uid,
          emailVerified: fireBaseUser.emailVerified,
        })
          .then(() => this.props.getUserInfo());
      }
    };
    checkUserEmailVerification();
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

  onChangePassword1(e) {
    this.setState({ password1: e.target.value });
  }

  onChangePassword2(e) {
    this.setState({ password2: e.target.value });
  }

  onChangeEmailReminder(e) {
    this.setState({ emailReminder: e.target.value });
  }

  onChangePhoneNumber(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  onChangeTextReminder(e) {
    this.setState({ textReminder: e.target.value });
  }

  sendEmailVerification() {
    const emailVerfication = async () => {
      const firebaseUser = firebase.auth().currentUser;
      const emailVerification = await firebaseUser.sendEmailVerification();
    };
    emailVerfication();
    let intervals = 0;
    const stopInterval = setInterval(() => {
      firebase.auth().currentUser.reload();
      const fireBaseUser = firebase.auth().currentUser;
      intervals++;
      if (fireBaseUser.emailVerified) {
        const update = axios.put('/api/updateEmailValidation', {
          userId: fireBaseUser.uid,
          emailVerified: fireBaseUser.emailVerified,
        })
          .then(() => this.props.getUserInfo())
          .catch(err => console.error(err));
      }
      if (intervals === 6 || fireBaseUser.emailVerified) {
        clearInterval(stopInterval);
      }
    }, 20000);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.updateUser;
    this.setState({
      firstName: form.firstName.value || this.state.firstName,
      lastName: form.lastName.value || this.state.lastName,
      email: form.email.value || this.state.email,
      emailReminder: this.state.emailReminder,
      phoneNumber: this.state.phoneNumber,
      textReminder: this.state.textReminder,
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
      phoneNumber: this.state.phoneNumber,
      textReminder: this.state.textReminder,
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
    let displayName = 'Stranger';
    if (this.props.userFirstName && this.props.userLastName) {
      displayName = `${this.props.userFirstName} ${this.props.userLastName}`;
    } else if (this.props.userFirstName) {
      displayName = this.props.userFirstName;
    } else if (this.props.githubUsername) {
      displayName = this.props.githubUsername;
    }

    const emailReminderRadioButtons = (this.state.emailReminder === true) ? (
      <label htmlFor="emailReminder">
        <Input label="On" type="radio" name="emailReminder" value="true" defaultChecked="checked" onClick={this.onChangeEmailReminder} />
        <Input label="Off" type="radio" name="emailReminder" value="false" onClick={this.onChangeEmailReminder} />
      </label>) : (
        <label htmlFor="emailReminder">
          <Input label="On" type="radio" name="emailReminder" value="true" onClick={this.onChangeEmailReminder} />
          <Input label="Off" type="radio" name="emailReminder" value="false" defaultChecked="checked" onClick={this.onChangeEmailReminder} />
        </label>
    );

    const textReminderRadioButtons = (this.state.textReminder === true) ? (
      <label htmlFor="emailReminder">
        <Input label="On" type="radio" name="emailReminder" value="true" defaultChecked="checked" onClick={this.onChangeEmailReminder} />
        <Input label="Off" type="radio" name="emailReminder" value="false" onClick={this.onChangeEmailReminder} />
      </label>) : (
        <label htmlFor="textReminder">
          <Input label="On" type="radio" name="textReminder" value="true" onClick={this.onChangeTextReminder} />
          <Input label="Off" type="radio" name="textReminder" value="false" defaultChecked="checked" onClick={this.onChangeTextReminder} />
        </label>
    );
    return (
      <div className="container">
        <Card>
          <ProfileNav />
          <h5>Hello, {displayName}!</h5>
          {this.props.githubUsername ? <p className="profile-github-handle">Github Username: {this.props.githubUsername}</p> : ''}
          <br />
          <br />
          <strong>Update Your Info</strong><br />
          <form name="updateUser" onSubmit={this.handleSubmit}>
            <Row>
              <Col s={6}>
                <label htmlFor="firstName">
                  First Name:
                  <input type="text" name="firstName" placeholder={this.state.firstName} onChange={this.onChangeFirstName} />
                </label>
              </Col>
              <Col s={6}>
                <label htmlFor="lastName">
                  Last Name:
                  <input type="text" name="lastName" placeholder={this.state.lastName} onChange={this.onChangeLastName} />
                </label>
              </Col>
              <Col s={6}>
                <label htmlFor="email">
                  Email:
                  <input type="email" name="email" placeholder={this.state.email} onChange={this.onChangeEmail} />
                </label>
              </Col>
              <Col s={6}>
                <label htmlFor="phoneNumber">
                  Phone:
                  <input type="text" name="phoneNumber" placeholder={this.state.phoneNumber} onChange={this.onChangePhoneNumber} />
                </label>
              </Col>
              <Col s={6}>
                {this.props.verifiedEmail ? <div > Interview E-Mail Reminder: <br /> {emailReminderRadioButtons} </div> :
                <Button type="button" onClick={this.sendEmailVerification}>Click Here to Verify Your Email
                </Button>}
              </Col>
              <Col s={6}>
                Interview Text Reminder: <br /> {textReminderRadioButtons}
              </Col>
            </Row>
            <Button type="submit">Submit</Button>
          </form>
          <br />
          <strong>Change Password</strong>
          <form name="changePassword" onSubmit={this.handlePasswordSubmit}>
            <Row>
              <Input s={6} label="New Password:" type="password" onChange={this.onChangePassword1} />
              <Input s={6} label="Verify Password:" type="password" onChange={this.onChangePassword2} />
            </Row>
            <Button type="submit">Change Password</Button>
          </form>
          <br />
        </Card>
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
