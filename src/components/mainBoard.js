import React from 'react';
import { browserHistory, Route, Switch } from 'react-router-dom';

import Dashboard from './dashboard.js';
import Resume from './resume.js';
import Resources from './resources.js';

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
          <Route path="/home/resume" component={Resume} />
          <Route path="/home/resources" component={Resources} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default Main;
