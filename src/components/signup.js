import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Card, Input, Button, Row } from 'react-materialize';
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
      Auth.signUp(this.state.signUpUsername, this.state.signUpPassword, this.state.firstName, this.state.lastName, (err, user) => {
        if (err) alert(err);
        else {
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
  // handleTest(e) {
  //   e.preventDefault();
  //   this.props.TESTBUTTON();
  // }

  render() {
    return (
      <div className="container">
        <Card>
          <div id="temp">
            <h3>Sign Up</h3>
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
    );
  }
}

export default Signup;
