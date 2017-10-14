import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from './Auth';

class Navbar extends React.Component {
  handleTest(e) {
    e.preventDefault();
    this.props.TESTBUTTON();
  }

  render() {
    return (
      <div className="navBar">
        <nav id="main-navigation">
          <li><Link to="/home/dashboard">Dashboard</Link></li>
          <li><Link to="/home/resume">Resume</Link></li>
          <li><Link to="/home/resources">Resources</Link></li>
          <li onClick={this.props.signOut}><Link to="/">Sign Out</Link></li>
          <button onClick={e => this.handleTest(e)}>TESTBUTTON</button>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  TESTBUTTON: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};
export default Navbar;
