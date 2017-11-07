import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
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

  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col s6">
              <h5 className="white-text">.apply(me)</h5>
              <p className="grey-text text-lighten-4">Getting you jobs. Making you smarter.</p>
            </div>
            <div className="col s6">
              <h5 className="white-text">Links</h5>
              <ul className="footer-links">
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
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2017 Copyright .apply(me)
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
