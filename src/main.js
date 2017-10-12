import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { HashRouter } from 'react-router-dom';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('mount'));
});
