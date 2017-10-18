import React from 'react';
import firebase from 'firebase';
import { browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import Modal from 'react-modal';
import fire from './Firebase.js';
import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';
import Auth from './Auth.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false,
      gitMerging: false,
      mergeTemp: '',
      mergePassword: '',
    };
    this.setUser = this.setUser.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.GitAuth = this.GitAuth.bind(this);
    this.handleMergePassword = this.handleMergePassword.bind(this);
    this.GitMerge = this.GitMerge.bind(this);
    this.closeMerge = this.closeMerge.bind(this);
    this.TESTBUTTON = this.TESTBUTTON.bind(this);
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          isLoggedIn: true,
        });
      }
    });
  }
  setUser(user, bool) {
    this.setState({
      isLoggedIn: bool,
      user,
    }, () => { console.log(this.state); });
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
  closeMerge() {
    this.setState({
      gitMerging: false,
    });
  }
  GitAuth() {
    Auth.gitAuth((error, win) => {
      if (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.setState({
            gitMerging: true,
            mergeTemp: error.email,
          });
        } else {
          alert(error);
        }
      } else {
        this.setUser(win, true);
      }
    }, (whatever) => { console.log(whatever.user.email); });
  }
  handleMergePassword(e) {
    e.preventDefault();
    this.setState({
      mergePassword: e.target.value,
    });
  }
  GitMerge(e) {
    e.preventDefault();
    Auth.gitAuthMerge(this.state.mergePassword, () => { this.closeMerge(); });
  }
  TESTBUTTON(e) {
    console.log('firebase.auth().currentUser', firebase.auth().currentUser);
    console.log('this.state.user', this.state.user);
    console.log('this.state.isLoggedIn', this.state.isLoggedIn);
    console.log('this.state.gitMerging', this.state.gitMerging);
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
        <Modal isOpen={this.state.gitMerging} onRequestClose={this.closeMerge}>
          <h1>Looks like your Github Email address already exists.</h1>
          <p>You're seeing this because an account associated with your github email address, {this.state.mergeTemp} already exists within our authentication system. Please enter the password for that email address below, and we'll merge the two accounts.</p>
          <br />
          <form id="merge" onSubmit={this.GitMerge}>
            <input onChange={this.handleMergePassword} type="password" placeholder="Email Password" />
            <button type="submit">Submit</button>
          </form>
          <button onClick={this.closeMerge}>Cancel</button>
        </Modal>
        <Switch>
          {this.routes('/signup', <Signup signUp={this.signUp} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/login', <Login signIn={this.signIn} TESTBUTTON={this.TESTBUTTON} user={this.state.user} signOut={this.signout} GitAuth={this.GitAuth} />, <Redirect to="/home" />)}
          {this.routes('/home', <Redirect to="/login" />, <Home signOut={this.signOut} user={this.state.user} TESTBUTTON={this.TESTBUTTON} />)}
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
