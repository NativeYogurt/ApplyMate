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
      <Navbar brand="ApplyMate" right>
        <NavItem><Link to="/home/dashboard">Dashboard</Link></NavItem>
        <NavItem><Link to="/home/searchjobs">Search Jobs</Link></NavItem>
        <NavItem><Link to="/home/resources">Resources</Link></NavItem>
        <NavItem><Link to="/home/tasks">Tasks</Link></NavItem>
        <NavItem><Link to="/home/analytics">Analytics</Link></NavItem>
        <NavItem><Link to="/home/profile">Profile</Link></NavItem>
        <NavItem onClick={e => this.handleSignOut(e)}><Link to="/">Sign Out</Link></NavItem>
      </Navbar>
    );
  }
}
// <div>
//   <ul id="main-navigation">
//     <li>ApplyMate</li>
//     <li className="navBar"><Link to="/home/dashboard">Dashboard</Link></li>
//     <li className="navBar"><Link to="/home/searchjobs">Search Jobs</Link></li>
//     <li className="navBar"><Link to="/home/resources">Resources</Link></li>
//     <li className="navBar"><Link to="/home/tasks">Tasks</Link></li>
//     <li className="navBar"><Link to="/home/analytics">Analytics</Link></li>
//     <li className="navBar"><Link to="/home/profile">Profile</Link></li>
//     <li className="navBar" onClick={e => this.handleSignOut(e)}><Link to="/">Sign Out</Link></li>
//   </ul>
// </div>
Navbar.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default Nav;
