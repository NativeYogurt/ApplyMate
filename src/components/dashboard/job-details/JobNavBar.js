import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobNavbar = (props) => {
  return (
    <div>
      <ul id="job-navbar">
        <li><Link to="/home/dashboard/:id/show">Details</Link></li>
        <li><Link to="/home/dashboard/:id/company">Company</Link></li>
        <li><Link to="/home/dashboard/:id/contacts">Contacts</Link></li>
        <li><Link to="/home/dashboard/:id/documents">Documents</Link></li>
        <li><Link to="/home/dashboard/:id/activity">Activity</Link></li>
      </ul>
    </div>
  );
};

export default JobNavbar;
