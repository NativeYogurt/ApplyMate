import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Card, Input, Button, Row, Col } from 'react-materialize';
import Modal from 'react-modal';
import axios from 'axios';
import Auth from './Auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpPassword2: '',
      existingEmailModal: false,
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleSignUpUsername = this.handleSignUpUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.closeExistingEmailModal = this.closeExistingEmailModal.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    if (this.state.signUpPassword === this.state.signUpPassword2) {
      Auth.signUp(this.state.signUpUsername, this.state.signUpPassword, this.state.firstName, this.state.lastName, (err, user) => {
        if (err) {
          if (err.code === 'auth/email-already-in-use') {
            this.setState({
              existingEmailModal: true,
            })
          } else {
            alert(err);
          }
        } else {
          this.props.setUser(user, true);
        }
      });
    } else {
      alert('Your passwords do not match.');
    }
  }
  handleFirstName(e) {
    e.preventDefault();
    this.setState({
      firstName: e.target.value,
    });
  }
  handleLastName(e) {
    e.preventDefault();
    this.setState({
      lastName: e.target.value,
    });
  }
  handleSignUpUsername(e) {
    e.preventDefault();
    this.setState({
      signUpUsername: e.target.value,
    });
  }
  handlePassword(e) {
    e.preventDefault();
    this.setState({
      signUpPassword: e.target.value,
    });
  }
  handlePassword2(e) {
    e.preventDefault();
    this.setState({
      signUpPassword2: e.target.value,
    });
  }
  closeExistingEmailModal(e) {
    e.preventDefault();
    this.setState({
      existingEmailModal: false,
    });
  }

  render() {
    return (
      <div className="bg">
        <Row>
          <Col s={4}>
          <h3></h3>
          </Col>
        </Row>
        <div className="container">
          <Card className="sign-up">
            <Modal
              isOpen={this.state.existingEmailModal}
              onRequestClose={this.closeExistingEmailModal}
            >
              <h3>That email already exists.</h3>
              <p>The email address, {this.state.signUpUsername}, already exists within our authentication system. Please <a href="/#/login" >click here </a> to return to the login page, or sign up using a different email address.</p>
              <Button onClick={this.closeExistingEmailModal}>Cancel</Button>
            </Modal>
            <div id="temp">
              <h3 className="logo"><span className="login-logo">.apply(me)</span></h3>
              <h5>Sign Up</h5>
              <form id="signUp" onSubmit={this.handleSignUp}>
                <Row>
                  <Input s={6} onChange={this.handleFirstName} type="text" label="First Name" />
                  <Input s={6} onChange={this.handleLastName} type="text" label="Last Name" />
                  <Input s={12} onChange={this.handleSignUpUsername} type="email" placeholder="E-Mail Address" /><br />
                  <Input s={6} onChange={this.handlePassword} type="password" placeholder="Password" /><br />
                  <Input s={6} onChange={this.handlePassword2} type="password" placeholder="Verify Password" /><br />
                </Row>
                <Button type="submit">Sign Up</Button>
              </form>
              Already have an account? <Link to="/login">Sign in!</Link>
              <br />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Signup;
