import React from 'react';
import firebase from 'firebase';
import { browserHistory, Route, Redirect, Switch } from 'react-router-dom';

import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';

class App extends React.Component {
  static GitAuth(e) {
    e.preventDefault();
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log('token', result.credential.accessToken);
        console.log('user', result.user);
      })
      .catch((error) => {
        console.log('Git Auth Error:', error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false
    };
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.TESTBUTTON = this.TESTBUTTON.bind(this);
  }

  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyDCJr00bBeK0fBXZWA9IkDHSyh1DA-QVCE',
      authDomain: 'applymate-fc379.firebaseapp.com',
      databaseURL: 'https://applymate-fc379.firebaseio.com',
      projectId: 'applymate-fc379',
      storageBucket: '',
      messagingSenderId: '239144843563',
    };

    firebase.initializeApp(config);
  }

  signUp(e) {
    e.preventDefault();
    if (this.signUpPassword.value === this.signUpPassword2.value) {
      firebase.auth().createUserWithEmailAndPassword(
        this.signUpUsername.value,
        this.signUpPassword.value,
      )
        .then((user) => {
          this.setState({
            user,
            isLoggedIn: true,
          });
          console.log('logged in as:', user);
        })
        .catch((error) => {
          console.error('Firebase Signup Error:', error.code);
          console.error(error.message);
          alert(error.message);
        });
    } else {
      alert('Your passwords do not match.');
    }
  }
  signIn(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(
      this.signInUsername.value,
      this.signInPassword.value,
    )
      .then((user) => {
        this.setState({
          user,
          isLoggedIn: true,
        });
        console.log(console.log('logged in as:', user));
      })
      .catch((error) => {
        console.error('Firebase Sign in Error:', error.code);
        console.error(error.message);
        alert(error.message);
      });
  }

  signOut(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null,
          isLoggedIn: false,
        });
        console.log('Signed out');
      })
      .catch((error) => {
        console.error('Firebase Sign out Error:', error.code);
        console.error(error.message);
        alert(error.message);
      });
  }
  TESTBUTTON(e) {
    e.preventDefault();
    console.log('firebase.auth().currentUser', firebase.auth().currentUser);
    console.log('this.state.user', this.state.user);
  }
  requireAuth() {
    return !this.state.isLoggedIn;
  }
  routes(reRoutePath, isAuthReq, isAuthNotReq) {
    return (
      <Route
        path={reRoutePath}
        render={() => (
        this.requireAuth() ? (
        isAuthReq
      ) : (
        isAuthNotReq
      )
      )}
      />
    );
  }
  render() {
    return (
      <div>
        <Switch>
          {this.routes('/signup', <Signup signUp={this.signUp} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/login', <Login signIn={this.signIn} signOut={this.signOut} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/home', <Redirect to="/login" />, <Home signOut={this.signOut} user={this.state.user} />)}
          <Route
            exact
            path="*"
            render={() => (
              <Redirect to="/login" />
          )}
          />
        </Switch>
      </div>);
  }
}

export default App;
