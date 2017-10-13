import React from 'react';
import { browserHistory, Route, Switch } from 'react-router-dom';

import Dashboard from './dashboard.js';
import Resume from './resume.js';
import Resources from './resources.js';
import Profile from './Profile';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home/resume" render={() => (<Resume userId={this.props.userId} />)} />
          <Route path="/home/resources" render={() => (<Resources userId={this.props.userId} />)} />
          <Route path="/home/profile" render={() => (<Profile userId={this.props.userId} />)} />
          <Route render={() => (<Dashboard userId={this.props.userId} />)} />
        </Switch>
      </div>
    );
  }
}

export default Main;

// <Route path="/home/profile" render={() => (<Profile userId={this.props.userId} />)} />
