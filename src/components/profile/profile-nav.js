import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileNav = () => {
  return (
    <div>
      <ul className="tabs">
        <li className="tab"><Link to="/home/profile">My Info</Link></li>
        <li className="tab"><Link to="/home/profile/resume">Resume</Link></li>
        <li className="tab"><Link to="/home/profile/password">Password</Link></li>
      </ul>
    </div>
  );
};

export default ProfileNav;
