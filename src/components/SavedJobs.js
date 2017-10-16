import React from 'react';

const SavedJobs = (props) => {
  return (
    <div>
      <h6>Company: {props.jobPosting.company}</h6>
      <ul>
        <li>JobTitle: {props.jobPosting.jobTitle}</li>
        <li>Description: {props.jobPosting.description}</li>
        <li>Skills: {props.jobPosting.skills.join(', ')}</li>
        <li><a href={props.jobPosting.url} target="_blank">Job Posting</a></li>
      </ul>
    </div>
  );
};

export default SavedJobs;
