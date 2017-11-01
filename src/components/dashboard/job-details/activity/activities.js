import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Icon, Button, Input, Card } from 'react-materialize';

import ActivityEntry from './activity-entry';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
    this.getActivities = this.getActivities.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
  }
  componentDidMount() {
    this.getActivities();
  }
  getActivities() {
    axios.get('/api/activities', {
      params: {
        jobId: this.props.jobId,
      },
    })
      .then(({ data }) => {
        this.setState({
          activities: data,
        });
      })
      .catch(err => console.error(err));
  }
  deleteActivity(eventId) {
    const activities = this.state.activities.filter(activity => activity.eventId !== eventId);
    this.setState({
      activities,
    });
    axios.put('/api/activity/delete', { eventId });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.activities.length === 0 ? (
            <div>
              <Icon large>event</Icon>
              <div>Add Interview for this job.
              </div>
            </div>
            ) : null
          }
          <Link className="waves-effect waves-light btn" to={`/home/dashboard/${this.props.jobId}/activity/new`}>Add</Link>
        </div>
        <div>
          {this.state.activities.length > 0 ? this.state.activities.map(activity => {
            return (<ActivityEntry
              key={activity.eventId}
              activity={activity}
              deleteActivity={this.deleteActivity}
              jobId={this.props.jobId}
            />
          );
          }) : null
          }
        </div>
      </div>
    );
  }
}

export default Activity;
