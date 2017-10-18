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
    };
    this.setUser = this.setUser.bind(this);
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
    console.log('setUser', user, bool);
    this.setState({
      user,
      isLoggedIn: bool,
    });
  }
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
          {this.routes('/signup', <Signup setUser={this.setUser} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/login', <Login setUser={this.setUser} TESTBUTTON={this.TESTBUTTON} />, <Redirect to="/home" />)}
          {this.routes('/home', <Redirect to="/login" />, <Home TESTBUTTON={this.TESTBUTTON} user={this.state.user} setUser={this.setUser} />)}
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
