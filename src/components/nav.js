import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/resume">Resume</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li href="#" onClick={this.props.onLogout}>Logout</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Nav;
