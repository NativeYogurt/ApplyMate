import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import JobStatus from './jobstatus';
import Applications from './applications';

const Analytics = ({ savedJobs }) => {
  return (
    <div>
      <JobStatus savedJobs={savedJobs} />
      <Applications savedJobs={savedJobs} />
    </div>
  );
};

export default Analytics;
