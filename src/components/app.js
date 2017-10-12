import React from 'react';
import firebase from 'firebase';
import { browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import fire from './Firebase.js' 
import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';
import Auth from './Auth.js'

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
    this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.TESTBUTTON = this.TESTBUTTON.bind(this);
  }
  setUser(user) {
    this.setState({
      user,
    });
  }
  setIsLoggedIn(bool) {
    this.setState({
      isLoggedIn: bool,
    });
  }
  signUp(user, pass, first, last) {
    Auth.signUp(user, pass, first, last, (err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win);
        this.setIsLoggedIn(true);
      }
    });
  }
  signIn(user, pass) {
    Auth.signIn(user, pass, (err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win);
        this.setIsLoggedIn(true);
      }
    });
  }
  signOut() {
    Auth.signOut((err, win) => {
      if (err) alert(err);
      else {
        this.setUser(win);
        this.setIsLoggedIn(false);
      }
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
          {this.routes('/signup', <Signup signUp={this.signUp} setUser={this.setUser} setIsLoggedIn={this.setIsLoggedIn} />, <Redirect to="/home" />)}
          {this.routes('/login', <Login signIn={this.signIn} setUser={this.setUser} setIsLoggedIn={this.setIsLoggedIn} />, <Redirect to="/home" />)}
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
