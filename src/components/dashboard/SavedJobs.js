import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'react-materialize';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

class SavedJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.jobPosting.status,
      hover: false,
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.redirect = this.redirect.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.jobPosting.status === this.state.status) {
      return;
    }
    this.setState({ status: newProps.jobPosting.status });
  }
  onMouseLeaveHandler() {
    this.setState({ hover: false });
  }
  onMouseEnterHandler(){
    this.setState({ hover: true });
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value });
    const job = {
      company: this.props.jobPosting.company,
      jobTitle: this.props.jobPosting.jobTitle,
      status: e.target.value,
      dateApplied: this.props.jobPosting.dateApplied,
      location: this.props.jobPosting.location,
      url: this.props.jobPosting.url,
      companyUrl: this.props.jobPosting.companyUrl,
      notes: this.props.jobPosting.notes,
    };
    fetch(`/api/jobs/${this.props.jobPosting.jobId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    }).then(res => res.json())
      .then(data => {
        // this.showSuccess());
        Materialize.toast('New job status saved!', 4000);
      });
  }
  redirect() {
    window.location = `/#/home/dashboard/${this.props.jobPosting.jobId}`;
  }
  render() {
    const favoriteState = this.props.jobPosting.favorite;
    const activePosting = this.props.jobPosting.activeJobPosting
    return (
      <tr className="saved-job-posting" onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
        <td>
          {this.state.hover || favoriteState ?
            <Button className="favorite" icon={favoriteState ? 'favorite' : 'favorite_border'} onClick={() => this.props.favoriteJob(this.props.jobPosting.jobId)} />
          :
            <Button className="favorite hidden" icon={favoriteState ? 'favorite' : 'favorite_border'} />
          }
        </td>
        <td onClick={() => this.redirect()} >{this.props.jobPosting.company}</td>
        <td onClick={() => this.redirect()} >{this.props.jobPosting.jobTitle}</td>
        <td>
          <select className="browser-default" name="status" value={this.state.status} onChange={this.onChangeStatus}>
            <option value="wishlist">Wishlist</option>
            <option value="applied">Applied</option>
            <option value="phone">Phone</option>
            <option value="onSite">OnSite</option>
            <option value="rejected">Rejected</option>
            <option value="offer">Offer</option>
          </select>
        </td>
        <td onClick={() => this.redirect()} >{this.props.jobPosting.dateApplied ? moment(this.props.jobPosting.dateApplied).format('MMM Do YY') : ''}</td>
        <td onClick={() => this.redirect()} >{this.props.jobPosting.location}</td>
        <td><a href={this.props.jobPosting.url} className={activePosting ? 'active' : 'inactive'} target="_blank" data-tip="Job URL"><Icon>{activePosting ? 'bookmark' : 'cancel'}</Icon></a>{activePosting ? null : <span id="refresh" data-tip="Confirm URL" onClick={() => this.props.revertJobUrlToActive(this.props.jobPosting.jobId)}><Icon>refresh</Icon></span>}</td>
        <td onClick={() => this.redirect()} >{this.props.jobPosting.skills.join(', ')}</td>

        <td>
        {this.state.hover ?
          <Button className="icon-button" icon="delete" onClick={() => this.props.deleteJob(this.props.jobPosting.jobId)} data-tip="Delete" />
        :
          <Button className="icon-button hidden" icon="delete" data-tip="Delete" />
        }</td>
        <ReactTooltip />
      </tr>
    );
  }
}
SavedJobs.propTypes = {
  jobPosting: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default SavedJobs;
