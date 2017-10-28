import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    (
      <HashRouter>
        <App />
      </HashRouter>
    ), document.getElementById('mount'),
  );
});
