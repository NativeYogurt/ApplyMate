import React from 'react';
import firebase from 'firebase';
import { browserHistory, Route, Redirect, Switch } from 'react-router-dom';
<<<<<<< HEAD
import Modal from 'react-modal';
import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';
import Auth from './Auth.js';
=======
import fire from './Firebase';
import Signup from './signup';
import Login from './login';
import Home from './home';
import Auth from './Auth';
>>>>>>> dad68bed7869b4759834fcd950adbe1316f70074

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
      isLoggedIn: false,
    };
    this.setUser = this.setUser.bind(this);
<<<<<<< HEAD
=======
    this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
>>>>>>> dad68bed7869b4759834fcd950adbe1316f70074
    this.TESTBUTTON = this.TESTBUTTON.bind(this);
  }
  componentWillMount() {
    let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          isLoggedIn: true,
        });
      }
    });
    setTimeout(() => unsubscribe(), 5000);
  }

  setUser(user, bool) {
    this.setState({
      user,
      isLoggedIn: bool,
    });
  }
<<<<<<< HEAD
=======
  setIsLoggedIn(bool) {
    this.setState({
      isLoggedIn: bool,
    });
  }
  signUp(user, pass, first, last) {
    Auth.signUp(user, pass, first, last, (err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win, true);
      }
    });
  }
  signIn(user, pass) {
    Auth.signIn(user, pass, (err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win, true);
      }
    });
  }
  signOut() {
    Auth.signOut((err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win, false);
      }
    });
  }
>>>>>>> dad68bed7869b4759834fcd950adbe1316f70074
  TESTBUTTON(e) {
    console.log('firebase.auth().currentUser', firebase.auth().currentUser);
    console.log('this.state.user', this.state.user);
    console.log('this.state.isLoggedIn', this.state.isLoggedIn);
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
<<<<<<< HEAD
          {this.routes('/signup', <Signup setUser={this.setUser} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/login', <Login setUser={this.setUser} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/home', <Redirect to="/login" />, <Home TESTBUTTON={this.TESTBUTTON} user={this.state.user} setUser={this.setUser} />)}
=======
          {this.routes('/signup', <Signup signUp={this.signUp} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/login', <Login signIn={this.signIn} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/home', <Redirect to="/login" />, <Home signOut={this.signOut} user={this.state.user} TESTBUTTON={this.TESTBUTTON} />)}
>>>>>>> dad68bed7869b4759834fcd950adbe1316f70074
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
