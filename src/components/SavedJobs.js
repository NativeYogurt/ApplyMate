import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SavedJobs = (props) => {
  return (
    <tr>
      <td>{props.jobPosting.company}</td>
      <td><Link to={`/home/dashboard/${props.jobPosting.jobId}`}>{props.jobPosting.jobTitle}</Link></td>
      <td>{props.jobPosting.status}</td>
      <td>{props.jobPosting.dateApplied}</td>
      <td><a href={props.jobPosting.url} target="_blank">ClickMe</a></td>
      <td className="truncate">{props.jobPosting.skills.join(', ')}</td>
      <td><button onClick={() => props.deleteJob(props.jobPosting.jobId)}>Delete</button></td>
      <td><a href="#/home/resources" onClick={() => props.getJobComparison(props.jobPosting.jobId)}>
            Check Qualification
          </a>
      </td>
    </tr>
  );
};

SavedJobs.propTypes = {
  jobPosting: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default SavedJobs;
