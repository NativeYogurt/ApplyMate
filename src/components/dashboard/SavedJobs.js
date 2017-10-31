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
      <td>
        <select className="browser-default" name="status" value={props.jobPosting.status}>
          <option value="wishlist">Wishlist</option>
          <option value="applied">Applied</option>
          <option value="phone">Phone</option>
          <option value="onSite">OnSite</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>
      </td>
      <td onClick={() => redirect()} >{props.jobPosting.dateApplied}</td>
      <td onClick={() => redirect()} >{props.jobPosting.location}</td>
      <td><a href={props.jobPosting.url} className={activePosting ? 'active' : 'inactive'} target="_blank"><Icon>{activePosting ? 'bookmark' : 'cancel'}</Icon></a>{activePosting ? null : <span id="refresh" onClick={() => props.revertJobUrlToActive(props.jobPosting.jobId)}><Icon>refresh</Icon></span>}</td>
      <td onClick={() => redirect()} >{props.jobPosting.skills.join(', ')}</td>
      <td>
        <Button className="favorite" icon={favoriteState ? 'favorite' : 'favorite_border'} onClick={() => props.favoriteJob(props.jobPosting.jobId)} />
      </td>
      <td><Button className="icon-button" icon="delete" onClick={() => props.deleteJob(props.jobPosting.jobId)} /></td>
    </tr>
  );
};
// <img id="favorite" src={favoriteUrl} alt="Star" onClick={() => props.favoriteJob(props.jobPosting.jobId)} />
// <a href="#" onClick={() => props.favoriteJob(props.jobPosting.jobId)}>
//       {favoriteState ? <Icon>favorite</Icon> : <Icon>favorite_border</Icon>}
//     </a>
SavedJobs.propTypes = {
  jobPosting: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default SavedJobs;
