import React from 'react';
import { browserHistory, Route, Redirect, Switch } from 'react-router-dom';

import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="/home" />
          <Route
            path="*"
            render={() => {
              return <p>Page Not Found</p>
            }}
          />
        </Switch>
      </div>);
  }
}

export default App;
