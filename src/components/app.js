import React from 'react';
import firebase from 'firebase';
import { browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import Modal from 'react-modal';
import Signup from './user/signup';
import Login from './user/login';
import Home from './home';
import Auth from './user/Auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false,
      rerender: false,
    };
    this.setUser = this.setUser.bind(this);
    this.rerender = this.rerender.bind(this);
    this.TESTBUTTON = this.TESTBUTTON.bind(this);
  }

  componentWillMount() {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
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

  rerender() {
    console.log(this.state.rerender, !this.state.rerender);
    this.setState({
      rerender: !this.state.rerender,
    }, () => console.log(this.state.rerender));
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
          {this.routes('/signup', <Signup setUser={this.setUser} rerender={this.rerender}/>, <Redirect to="/home" />)}
          {this.routes('/login', <Login setUser={this.setUser} />, <Redirect to="/home" />)}
          {this.routes('/home', <Redirect to="/login" />, <Home rerender={this.state.rerender} user={this.state.user} setUser={this.setUser} />)}
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
