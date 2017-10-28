import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, NavItem } from 'react-materialize';
import Auth from './Auth';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleTest(e) {
    e.preventDefault();
    this.props.TESTBUTTON();
  }
  handleSignOut(e) {
    e.preventDefault();
    Auth.signOut((err, user) => {
      if (err) alert(err);
      else {
        this.props.setUser(user, false);
      }
    });
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">ApplyMate</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/home/dashboard">Dashboard</Link></li>
            <li><Link to="/home/searchjobs">Search Jobs</Link></li>
            <li><Link to="/home/resources">Resources</Link></li>
            <li><Link to="/home/tasks">Tasks</Link></li>
            <li><Link to="/home/analytics">Analytics</Link></li>
            <li><Link to="/home/profile">Profile</Link></li>
            <li onClick={e => this.handleSignOut(e)}><Link to="/">Sign Out</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}
// <Navbar brand="ApplyMate" right>
//   <NavItem><Link to="/home/dashboard">Dashboard</Link></NavItem>
//   <NavItem><Link to="/home/searchjobs">Search Jobs</Link></NavItem>
//   <NavItem><Link to="/home/resources">Resources</Link></NavItem>
//   <NavItem><Link to="/home/tasks">Tasks</Link></NavItem>
//   <NavItem><Link to="/home/analytics">Analytics</Link></NavItem>
//   <NavItem><Link to="/home/profile">Profile</Link></NavItem>
//   <NavItem onClick={e => this.handleSignOut(e)}><Link to="/">Sign Out</Link></NavItem>
// </Navbar>
Navbar.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default Nav;
