import React from 'react';

import JobNavBar from './JobNavBar';
import JobBoard from './JobBoard';

const JobHome = (props) => {
  return (
    <div>
      <div className="job-detail-navbar">
        <JobNavBar />
      </div>
      <JobBoard paramsId={props.match.params.id} />
    </div>);
}
export default JobHome;
