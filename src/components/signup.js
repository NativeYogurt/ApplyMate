import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpPassword2: '',
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleSignUpUsername = this.handleSignUpUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    if (this.state.signUpPassword === this.state.signUpPassword2) {
      this.props.signUp(this.state.signUpUsername, this.state.signUpPassword, this.state.firstName, this.state.lastName);
    } else {
      alert('Your passwords do not match.');
    }
  }
  handleTest(e) {
    e.preventDefault();
    this.props.TESTBUTTON();
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

  render() {
    return (
      <div id="temp">
        <form id="signUp" onSubmit={this.handleSignUp}>
          <input onChange={this.handleFirstName} type="text" placeholder="First Name" /><br />
          <input onChange={this.handleLastName} type="text" placeholder="Last Name" /><br />
          <input onChange={this.handleSignUpUsername} type="text" placeholder="E-Mail Address" /><br />
          <input onChange={this.handlePassword} type="password" placeholder="Password" /><br />
          <input onChange={this.handlePassword2} type="password" placeholder="Verify Password" /><br />
          <button type="submit">Sign Up</button>
        </form>
        <Link to="/login">
          <button>Log In
          </button>
          <button onClick={e => this.handleTest(e)}>TESTBUTTON</button>
        </Link>
      </div>
    );
  }
}

export default Signup;
