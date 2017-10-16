import React from 'react';
import PropTypes from 'prop-types';

const SavedJobs = (props) => {
  return (
    <div>
      <h6>Company: {props.jobPosting.company}</h6>
      <button onClick={() => props.deleteJob(props.jobPosting.jobId)}>Delete Job Post</button>
      <ul>
        <li>JobTitle: {props.jobPosting.jobTitle}</li>
        <li>Description: {props.jobPosting.description}</li>
        <li>Skills: {props.jobPosting.skills.join(', ')}</li>
        <li><a href={props.jobPosting.url} target="_blank">Job Posting</a></li>
      </ul>
    </div>
  );
};

SavedJobs.propTypes = {
  jobPosting: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default SavedJobs;
