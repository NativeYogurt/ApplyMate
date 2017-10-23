import React from 'react';
import PropTypes from 'prop-types';

const JobSearchResult = (props) => {
  return (
    <div>
      <div>Job Title: {props.job.title}</div>
      <div>Company: {props.job.company}</div>
      <div>Location: {props.job.location}</div>
      <div>Created at: {props.job.created_at}</div>
      <div><a href={props.job.url} target="_blank">Job Post</a></div>
      <div><button onClick={() => props.handleJobAdd(props.job)}>Add to Dashboard</button></div>
      <br />
    </div>
  );
};

JobSearchResult.propTypes = {
  company: PropTypes.string.isRequired,
};

export default JobSearchResult;
