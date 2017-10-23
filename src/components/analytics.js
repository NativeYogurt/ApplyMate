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
    labels: ['Wishlist', 'Applied', 'Phone', 'OnSite', 'Rejected', 'Offer'],
    datasets: [{
      label: 'Job Status',
      // data: savedJobs.map((job) => job.status),
      data: [25, 10, 4, 6, 2, 0],
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
        width={10}
        height={3}
        options={{
          maintainAspectRatio: true,
        }}
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
