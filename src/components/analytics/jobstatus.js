import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const JobStatus = ({ savedJobs }) => {
  const data = {
    labels: ['Wishlist', 'Applied', 'Phone', 'OnSite', 'Rejected', 'Offer'], // get these dynamically
    datasets: [{
      data: [25, 10, 4, 6, 2, 0], // data: savedJobs.map((job) => job.status),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // pink
        'rgba(54, 162, 235, 0.6)', // blue
        'rgba(255, 206, 86, 0.6)', // green
        'rgba(75, 192, 192, 0.6)', // yellow
        'rgba(153, 102, 255, 0.6)', // orange
        'rgba(255, 159, 64, 0.6)', // purple
        'rgba(255, 99, 132, 0.6)', // grey
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
          title: {
            display: true,
            text: 'Saved Jobs By Status',
            fontSize: 25,
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              fontColor: '#000',
            },
          },
          layout: {
            padding: {
              left: 50,
              right: 0,
              bottom: 0,
              top: 0,
            },
          },
          tooltips: {
            enabled: true,
          },
          maintainAspectRatio: true,
        }
      }
      />
    </div>
  );
};

export default JobStatus;
