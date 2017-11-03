import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Input } from 'react-materialize';
import ProfileNav from './profile-nav';

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
    };
    this.onChangePassword1 = this.onChangePassword1.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  onChangePassword1(e) {
    this.setState({ password1: e.target.value });
  }

  onChangePassword2(e) {
    this.setState({ password2: e.target.value });
  }

  handlePasswordSubmit(e) {
    e.preventDefault();
    if (this.state.password1 === this.state.password2) {
      this.updatePassword();
    } else alert('Passwords do not match');
  }

  updatePassword() {
    firebase.auth().currentUser.updatePassword(this.state.password1)
      .then(()=> alert("Your password has been changed."))
      .catch(err => alert(err));
  }

  render() {
    return (
      <div className="container">
        <Card>
          <ProfileNav />
          <h5>Change Password</h5>
          <br />
          <form name="changePassword" onSubmit={this.handlePasswordSubmit}>
            <Row>
              <Input s={6} label="New Password:" type="password" onChange={this.onChangePassword1} />
            </Row>
            <Row>
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

Password.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Password;
