import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'react-materialize';

const SavedJobs = (props) => {
  const redirect = function () { window.location = `/#/home/dashboard/${props.jobPosting.jobId}`; };
  const favoriteState = props.jobPosting.favorite;
  const activePosting = props.jobPosting.activeJobPosting
  return (
    <tr className="saved-job-posting">
      <td onClick={() => redirect()} >{props.jobPosting.company}</td>
      <td onClick={() => redirect()} >{props.jobPosting.jobTitle}</td>
      <td onClick={() => redirect()} >{props.jobPosting.status}</td>
      <td onClick={() => redirect()} >{props.jobPosting.dateApplied}</td>
      <td onClick={() => redirect()} >{props.jobPosting.location}</td>
      <td><a href={props.jobPosting.url} target="_blank"><Icon>{activePosting ? 'bookmark' : 'cancel'}</Icon></a></td>
      <td onClick={() => redirect()} >{props.jobPosting.skills.join(', ')}</td>
      <td>
        <Button className="favorite" icon={favoriteState ? 'favorite' : 'favorite_border'} onClick={() => props.favoriteJob(props.jobPosting.jobId)} />
      </td>
      <td><Button icon="delete" onClick={() => props.deleteJob(props.jobPosting.jobId)} /></td>
    </tr>
  );
};

SavedJobs.propTypes = {
  jobPosting: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default SavedJobs;
