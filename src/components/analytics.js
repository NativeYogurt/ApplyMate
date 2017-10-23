import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import DataChart from './data-chart';

const Analytics = ({ savedJobs }) => {
  // const data = {
  //   label: savedJobs.map((job) => job.status),
  //   datasets: []
  // };

  const data = {
    labels: savedJobs.map((job) => job.status),
    datasets: [{
      label: 'Job Status',
      data: [
        617594,
        381045,
      ],
      // backgroundColor:'green',
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
    },
    ],
  };

  return (
    <div>
      <Pie
        data={data}
      />
    </div>
  );
};


export default Analytics;

// Material:
// <Card>
//   <CardHeader
//     title="DATAVISUAL EXAMPLES:"
//   />
//   <CardMedia
//     overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
//   >
//     <DataChart />
//   </CardMedia>
//   <CardActions>
//     <FlatButton label="Action1" />
//     <FlatButton label="Action2" />
//   </CardActions>
// </Card>
