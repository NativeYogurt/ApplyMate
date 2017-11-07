import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Card, Input, Button, Row, Col } from 'react-materialize';

import Auth from './Auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      gitMergeModal: false,
      mergeEmail: '',
      mergePassword: '',
      mergeCred: '',
      resetPasswordModal: false,
      resetPassEmail: '',
      resetEmailSetModal: false,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.signIn = this.signIn.bind(this);
    this.gitAuth = this.gitAuth.bind(this);
    this.closeMergeModal = this.closeMergeModal.bind(this);
    this.handleMergePassword = this.handleMergePassword.bind(this);
    this.GitMerge = this.GitMerge.bind(this);
    this.handleResetPassEmail = this.handleResetPassEmail.bind(this);
    this.openResetPassModal = this.openResetPassModal.bind(this);
    this.closeResetPassModal = this.closeResetPassModal.bind(this);
    this.closeResPassConModal = this.closeResPassConModal.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  // email login procedure
  handleEmail(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  }
  handlePassword(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value,
    });
  }
  signIn(e) {
    e.preventDefault();
    Auth.signIn(this.state.email, this.state.password, (err, win) => {
      if (err) alert(err);
      else {
        this.props.setUser(win, true);
      }
    });
  }

  // github login
  gitAuth(e) {
    e.preventDefault();
    Auth.gitAuth((error, githubAuth, errCred, errEmail) => {
      if (error) {
        // git merge
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.setState({
            gitMergeModal: true,
            mergeEmail: errEmail,
            mergeCred: errCred,
          });
        } else {
          alert(error);
        }
      } else {
        this.props.setUser(githubAuth.user, true);
      }
    });
  }
  closeMergeModal() {
    this.setState({
      gitMergeModal: false,
    }, () => location.reload());
  }
  handleMergePassword(e) {
    e.preventDefault();
    this.setState({
      mergePassword: e.target.value,
    });
  }
  GitMerge(e) {
    e.preventDefault();
    Auth.gitAuthMerge(
      this.state.mergePassword,
      this.state.mergeCred, this.state.mergeEmail, ((err, merged) => {
        if (err) alert(err);
        else this.closeMergeModal();
      }));
  }

  // forgot password
  handleResetPassEmail(e) {
    e.preventDefault();
    this.setState({
      resetPassEmail: e.target.value,
    });
  }
  openResetPassModal(e) {
    e.preventDefault();
    this.setState({
      resetPasswordModal: true,
    });
  }
  closeResetPassModal(e) {
    e.preventDefault();
    this.setState({
      resetPasswordModal: false,
    });
  }
  closeResPassConModal(e) {
    e.preventDefault();
    this.setState({
      resetEmailSetModal: false,
    });
  }
  resetPassword(e) {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(this.state.resetPassEmail)
      .then((win) => {
        this.setState({
          resetEmailSetModal: true,
        });
      })
      .catch(err => alert(err));
  }

  handleTest(e) {
    e.preventDefault();
    this.props.TESTButton();
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
          <Card className="sign-in">
            <h3 className="logo"><span className="login-logo">.apply(me)</span><p className="logo-slogan">Getting you jobs. Making you smarter.</p></h3>
            <Modal isOpen={this.state.gitMergeModal} onRequestClose={this.closeMergeModal}>
              <h3>Looks like your Github Email address already exists.</h3>
              <p>You're seeing this because an account associated with your github email address, {this.state.mergeEmail} already exists within our authentication system. Please enter the password for that email address below, and we'll merge the two accounts.</p>
              <br />
              <form id="merge" onSubmit={this.GitMerge}>
                <Input onChange={this.handleMergePassword} type="password" label="Email Password" />
                <Button type="submit">Submit</Button>
              </form>
              <Button onClick={this.closeMergeModal}>Cancel</Button>
            </Modal>
            <Modal isOpen={this.state.resetPasswordModal} onRequestClose={this.closeResetPassModal}>
              <h3>Reset Password</h3>
              <p>Forgot your password? Don't worry, happens to the best of us. Just enter your email address below and we'll send you an email with a reset password link.</p>
              <form onSubmit={this.resetPassword} >
                <Input onChange={this.handleResetPassEmail} type="text" placeholder="pika@chu.com" />
                <Button type="submit">Send Reset Link</Button>
              </form>
              <Button onClick={this.closeResetPassModal}> Close </Button>
            </Modal>
            <Modal isOpen={this.state.resetEmailSetModal} onRequestClose={this.closeResPassConModal}>
              <h1>Email has been sent, please check your inbox</h1>
              <br />
              <Button onClick={this.closeResPassConModal}>Close</Button>
            </Modal>
            <form id="signIn" onSubmit={this.signIn}>
              <Input id="email" onChange={this.handleEmail} type="email" label="E-Mail Address" />
              <Input id="pw" onChange={this.handlePassword} type="password" label="Password" />
              <Row>
                <Col s={9}>
                  <Button id="signin-button" type="submit">Sign In</Button>
                </Col>
                <Col s={3}>
                  <a href="#" onClick={this.openResetPassModal}>Forgot your password?</a>
                </Col>
              </Row>
            </form>
            <br />
            <Row>
              <Col s={12}>
                <Button id="GitAuthButton" onClick={this.gitAuth}>Signin using Github</Button>
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                Do not have an account? <Link to="/signup">Sign up!</Link>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}
export default Login;

// <span id="login-blinking-cursor">|</span>
