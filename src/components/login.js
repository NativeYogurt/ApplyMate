import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleGitAuth = this.handleGitAuth.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

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
  handleLogin(e) {
    e.preventDefault();
    this.props.signIn(this.state.email, this.state.password);
  }
  handleGitAuth(e) {
    e.preventDefault();
    this.props.GitAuth()
  }
  handleTest(e) {
    e.preventDefault();
    this.props.TESTBUTTON();
  }
  handleSignOut(e) {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    return (
      <div>Hello World

        <form id="signIn" onSubmit={this.handleLogin}>
          <input onChange={this.handleEmail} type="text" placeholder="E-Mail Address" /> <br />
          <input onChange={this.handlePassword} type="password" placeholder="Password" /> <br />
          <button type="submit">Sign In</button>
        </form>
        <Link to="/signup">
          <button>Sign Up
          </button>
        </Link>
        <br /><br />
        <button id="GitAuthButton" onClick={this.handleGitAuth}>Login using Github</button>
        <br />
        <button onClick={this.props.signOut}>LogOut</button>
        <br /><br /><br /><br />
        <button onClick={this.handleTest}>TESTBUTTON</button>
      </div>
    );
  }
}

export default Login;
