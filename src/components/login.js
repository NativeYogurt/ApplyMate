import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Auth from './Auth.js'

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
    });
  }
  handleMergePassword(e) {
    e.preventDefault();
    this.setState({
      mergePassword: e.target.value,
    });
  }
  GitMerge(e) {
    e.preventDefault();
    Auth.gitAuthMerge(this.state.mergePassword, this.state.mergeCred, this.state.mergeEmail, ((err, merged) => {
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
    this.props.TESTBUTTON();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.gitMergeModal} onRequestClose={this.closeMergeModal}>
          <h1>Looks like your Github Email address already exists.</h1>
          <p>You're seeing this because an account associated with your github email address, {this.state.mergeEmail} already exists within our authentication system. Please enter the password for that email address below, and we'll merge the two accounts.</p>
          <br />
          <form id="merge" onSubmit={this.GitMerge}>
            <input onChange={this.handleMergePassword} type="password" placeholder="Email Password" />
            <button type="submit">Submit</button>
          </form>
          <button onClick={this.closeMergeModal}>Cancel</button>
        </Modal>
        <Modal isOpen={this.state.resetPasswordModal} onRequestClose={this.closeResetPassModal}>
          <h1>Reset Password</h1>
          <p>Forgot your password? Don't worry, happens to the best of us. Just enter your email address below and we'll send you an email with a reset password link.</p>
          <form onSubmit={this.resetPassword} >
            <input onChange={this.handleResetPassEmail} type="text" placeholder="pika@chu.com" />
            <button type="submit">Send Reset Link</button>
          </form>
          <button onClick={this.closeResetPassModal}> Close </button>
          <br />
        </Modal>
        <Modal isOpen={this.state.resetEmailSetModal} onRequestClose={this.closeResPassConModal}>
          <h1>Email has been sent, please check your inbox</h1>
          <br />
          <button onClick={this.closeResPassConModal}>Close</button>
        </Modal>
        <form id="signIn" onSubmit={this.signIn}>
          <input onChange={this.handleEmail} type="text" placeholder="E-Mail Address" /> <br />
          <input onChange={this.handlePassword} type="password" placeholder="Password" /> <br />
          <button type="submit">Sign In</button>
        </form>
        <Link to="/signup">
          <button>Sign Up
          </button>
        </Link>
        <br /><br />
        <button id="GitAuthButton" onClick={this.gitAuth}>Login using Github</button>
        <br />
        <button onClick={this.openResetPassModal}>Reset Password</button>
        <br /><br /><br /><br />
      </div>
    );
  }
}
export default Login;

// <button onClick={this.handleTest.bind(this)}>TESTBUTTON</button>