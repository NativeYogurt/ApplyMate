import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { HashRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('mount'));
});
