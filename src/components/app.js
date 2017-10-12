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
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.TESTBUTTON = this.TESTBUTTON.bind(this);
  }

  componentDidMount() {
  }

  signUp(user, pass) {
    Auth.signUp(user, pass);
    this.setState({
      isLoggedIn: true,
    });
  }
  signIn(user, pass) {
    Auth.signIn(user, pass);
    this.setState({
      isLoggedIn: true,
    });
  }

  signOut() {
    Auth.signOut();
    this.setState({
      isLoggedIn: false,
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
          {this.routes('/login', <Login signIn={this.signIn} />, <Redirect to="/home" />)}
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
