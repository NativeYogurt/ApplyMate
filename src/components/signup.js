import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSignUp(e) {
    e.preventDefault();
    if (this.signUpPassword.value === this.signUpPassword2.value) {
      this.props.signUp(this.signUpUsername.value, this.signUpPassword.value, this.firstName.value, this.lastName.value);
    } else {
      alert('Your passwords do not match.');
    }
  }
  handleTest(e) {
    e.preventDefault();
    this.props.TESTBUTTON();
  }

  render() {
    return (
      <div id="temp">Hello World
        <form id="signUp" onSubmit={e => this.handleSignUp(e)}>
          <input ref={(input) => { this.firstName = input; }} type="text" placeholder="First Name" /><br />
          <input ref={(input) => { this.lastName = input; }} type="text" placeholder="Last Name" /><br />
          <input ref={(input) => { this.signUpUsername = input; }} type="text" placeholder="E-Mail Address" /><br />
          <input ref={(input) => { this.signUpPassword = input; }} type="password" placeholder="Password" /><br />
          <input ref={(input) => { this.signUpPassword2 = input; }} type="password" placeholder="Verify Password" /><br />
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
