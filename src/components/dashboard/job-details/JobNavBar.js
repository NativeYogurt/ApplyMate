import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';

class JobNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'details',
    };
    this.setActive = this.setActive.bind(this);
  }
  setActive(item) {
    this.setState({
      active: item,
    });
  }
  render() {
    return (
      <div>
        <ul className="tabs">
          <li className="tab">
            <Link
              className={this.state.active === 'details' ? 'active' : ''}
              onClick={() => { this.setActive('details'); }}
              to={`/home/dashboard/${this.props.jobId}/show`}
            >Details
            </Link>
          </li>
          <li className="tab">
            <Link
              className={this.state.active === 'company' ? 'active' : ''}
              onClick={() => { this.setActive('company'); }}
              to={`/home/dashboard/${this.props.jobId}/company`}
            >Company
            </Link>
          </li>
          <li className="tab">
            <Link
              className={this.state.active === 'contacts' ? 'active' : ''}
              onClick={() => { this.setActive('contacts'); }}
              to={`/home/dashboard/${this.props.jobId}/contacts`}
            >Contacts
            </Link>
          </li>
          <li className="tab">
            <Link
              className={this.state.active === 'resources' ? 'active' : ''}
              onClick={() => { this.setActive('resources'); }}
              to={`/home/dashboard/${this.props.jobId}/resources`}
            >Resources
            </Link>
          </li>
          <li className="tab">
            <Link
              className={this.state.active === 'activity' ? 'active' : ''}
              onClick={() => { this.setActive('activity'); }}
              to={`/home/dashboard/${this.props.jobId}/activity`}
            >Activity
            </Link>
          </li>
          <li className="tab">
            <Link
              className={this.state.active === 'tasks' ? 'active' : ''}
              onClick={() => { this.setActive('tasks'); }}
              to={`/home/dashboard/${this.props.jobId}/tasks`}
            >Tasks
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default JobNavbar;
