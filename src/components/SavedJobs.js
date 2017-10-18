import React from 'react';
import PropTypes from 'prop-types';

const SavedJobs = (props) => {
  return (
    <tr>
      <td>{props.jobPosting.company}</td>
      <td>{props.jobPosting.jobTitle}</td>
      <td>{props.jobPosting.status}</td>
      <td>{props.jobPosting.dateApplied}</td>
      <td><a href={props.jobPosting.url} target="_blank">ClickMe</a></td>
      <td className="truncate">{props.jobPosting.skills.join(', ')}</td>
      <td><button onClick={() => props.deleteJob(props.jobPosting.jobId)}>Delete</button></td>
    </tr>
  );
};

SavedJobs.propTypes = {
  jobPosting: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default SavedJobs;
