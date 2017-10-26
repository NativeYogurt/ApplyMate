import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import GithubSkills from '../profile/github-skills';

import JobStatus from './jobstatus';
import Applications from './applications';

const Analytics = (props) => {
  return (
    <div>
      <JobStatus savedJobs={props.savedJobs} />
      <Applications savedJobs={props.savedJobs} />
      {Object.keys(props.githubSkills).length ?
        <GithubSkills
          githubSkills={props.githubSkills}
        /> : null }
    </div>
  );
};

export default Analytics;
