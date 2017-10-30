import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import GithubSkills from '../profile/github-skills';

import JobStatus from './jobstatus';
import Applications from './applications';

const Analytics = (props) => {
  const hasAnalytics = props.savedJobs.length && Object.keys(props.githubSkills).length !== 0;

  return hasAnalytics ?
    (
      <div>
        <JobStatus savedJobs={props.savedJobs} />
        <Applications savedJobs={props.savedJobs} />
        {Object.keys(props.githubSkills).length ?
          <GithubSkills
            githubSkills={props.githubSkills}
          /> : null }
      </div>
    ) : <h6>Add Jobs To Your Dashboard To Track Your Analytics!</h6>;
};

export default Analytics;
