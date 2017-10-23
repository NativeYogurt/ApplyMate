import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobNavbar = (props) => {
  return (
    <div>
      <ul id="job-navbar">
        <li><Link to="/home/dashboard/job/show">Details</Link></li>
        <li><Link to="/home/dashboard/job/company">Company</Link></li>
        <li><Link to="/home/dashboard/job/contacts">Contacts</Link></li>
        <li><Link to="/home/dashboard/job/documents">Documents</Link></li>
        <li><Link to="/home/dashboard/job/activity">Activity</Link></li>
      </ul>
    </div>
  );
};

export default JobNavbar;
