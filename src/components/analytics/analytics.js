import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import JobStatus from './jobstatus';
import Applications from './applications';

const Analytics = ({ savedJobs }) => {
  const savedJobStatus = savedJobs.map((job) => job.status);

  // console.log(savedJobStatus);

  // const applicationstatus = null;
  // if (savedJobStatus) {
  //
  // }

  return (
    <div>
      <JobStatus />
      <Applications />
    </div>
  );
};

export default Analytics;
