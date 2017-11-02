import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown, Navbar, NavItem } from 'react-materialize';
import Auth from './user/Auth';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'dashboard',
    };
  }

  setActive(item) {
    this.setState({
      active: item,
    });
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
          <a href="#" className="brand-logo">.apply(me)</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li
              className={this.state.active === 'dashboard' ? 'active' : ''}
              onClick={() => {this.setActive('dashboard')}}>
              <Link to="/home/dashboard">Dashboard</Link>
            </li>
            <li
              className={this.state.active === 'search' ? 'active' : ''}
              onClick={() => {this.setActive('search')}}>
              <Link to="/home/searchjobs">Search Jobs</Link>
            </li>
            <li
              className={this.state.active === 'resources' ? 'active' : ''}
              onClick={() => {this.setActive('resources')}}>
              <Link to="/home/resources">Resources</Link>
            </li>
            <li
              className={this.state.active === 'tasks' ? 'active' : ''}
              onClick={() => {this.setActive('tasks')}}>
              <Link to="/home/tasks">Tasks</Link>
            </li>
            <li
              className={this.state.active === 'analytics' ? 'active' : ''}
              onClick={() => {this.setActive('analytics')}}>
              <Link to="/home/analytics">Analytics</Link>
            </li>
            <li
              className={this.state.active === 'profile' ? 'active' : ''}
              onClick={() => {this.setActive('profile')}}>
              <Dropdown
                trigger={<a><i className="large material-icons">account_circle</i></a>}
                options={{ hover: !true, belowOrigin: true }}
              >
                <li><Link to="/home/profile"><i className="large material-icons">settings</i> Profile</Link></li>
                <li onClick={e => this.handleSignOut(e)}><Link to="/"><i className="large material-icons">exit_to_app</i>Sign Out</Link></li>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Nav;
