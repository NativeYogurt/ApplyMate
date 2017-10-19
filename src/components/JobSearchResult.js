import React from 'react';
import PropTypes from 'prop-types';

const JobSearchResult = (props) => {
  return (
    <div>
      <div>Job Title: {props.job.title}</div>
      <div>Company: {props.job.company}</div>
      <div>Location: {props.job.location}</div>
      <div>Company URL: <a href={props.job.company_url} target="_blank">{props.job.company_url}</a></div>
      <div>Created at: {props.job.created_at}</div>
      <div><a href={props.job.how_to_apply.split('"')[1]} target="_blank">Apply Now</a></div>
      <div><button onClick={() => props.handleJobAdd(props.job)}>Add to Dashboard</button></div>
      <br />
    </div>
  );
};

JobSearchResult.propTypes = {
  company: PropTypes.string.isRequired,
};

export default JobSearchResult;
