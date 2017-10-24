import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SavedJobs = (props) => {
  let favoriteState = props.jobPosting.favorite;
  let favoriteUrl = '';
  if (favoriteState) {
    favoriteUrl = 'http://res.cloudinary.com/dxcydtwom/image/upload/v1508791828/gold_star_bagtk7.png';
  } else {
    favoriteUrl = 'http://res.cloudinary.com/dxcydtwom/image/upload/v1508791216/hollow_gold_star_unli4s.png';
  }

  return (
    <tr>
      <td>{props.jobPosting.company}</td>
      <td><Link to={`/home/dashboard/${props.jobPosting.jobId}`}>{props.jobPosting.jobTitle}</Link></td>
      <td>{props.jobPosting.status}</td>
      <td>{props.jobPosting.dateApplied}</td>
      <td>{props.jobPosting.location}</td>
      <td><a href={props.jobPosting.url} target="_blank">ClickMe</a></td>
      <td className="truncate">{props.jobPosting.skills.join(', ')}</td>
      <td><img src={favoriteUrl} alt="Star"  onClick={() => props.favoriteJob(props.jobPosting.jobId)}/> </td>
      <td><button onClick={() => props.deleteJob(props.jobPosting.jobId)}>Delete</button></td>
    </tr>
  );
};
SavedJobs.propTypes = {
  jobPosting: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default SavedJobs;
