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
        <h2>ApplyMate</h2>
        <ul id="main-navigation">
          <li><Link to="/home/dashboard">Dashboard</Link></li>
          <li><Link to="/home/resume">Resume</Link></li>
          <li><Link to="/home/resources">Resources</Link></li>
          <li><Link to="/home/searchjobs">Search Jobs</Link></li>
          <li><Link to="/home/profile">Profile</Link></li>
          <li onClick={this.props.signOut}><Link to="/">Sign Out</Link></li>
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  TESTBUTTON: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};
export default Navbar;
