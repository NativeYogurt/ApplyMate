import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobNavbar = (props) => {
  return (
    <div>
      <ul className="tabs">
        <li className="tab"><Link to="/home/dashboard/job/show">Details</Link></li>
        <li className="tab"><Link to="/home/dashboard/job/company">Company</Link></li>
        <li className="tab"><Link to="/home/dashboard/job/contacts">Contacts</Link></li>
        <li className="tab"><Link to="/home/dashboard/job/resources">Resources</Link></li>
        <li className="tab"><Link to="/home/dashboard/job/activity">Activity</Link></li>
        <li className="tab"><Link to="/home/dashboard/job/tasks">Tasks</Link></li>
      </ul>
    </div>
  );
};

export default JobNavbar;
