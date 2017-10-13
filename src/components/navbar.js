import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth.js';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="navBar">
        <nav id="main-navigation">
          <li><Link to="/home/dashboard">Dashboard</Link></li>
          <li><Link to="/home/resume">Resume</Link></li>
          <li><Link to="/home/resources">Resources</Link></li>
          <li><Link to="/home/profile">Profile</Link></li>
          <li onClick={this.props.signOut}><Link to="/">Sign Out</Link></li>
        </nav>
      </div>
    );
  }
}

export default Navbar;
