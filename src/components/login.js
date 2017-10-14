import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.signIn(this.state.email, this.state.password);
  }

  handleTest(e) {
    e.preventDefault();
    this.props.TESTBUTTON();
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
        <button onClick={e => this.handleTest(e)}>TESTBUTTON</button>
      </div>
    );
  }
}

export default Login;