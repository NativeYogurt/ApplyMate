import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Applications = ({ savedJobs }) => {
  const data = {
    labels: ['Saved Jobs', 'Applied'], // get these dynamically
    datasets: [{
      data: [25, 10], // data: savedJobs.map((job) => job.status),
      backgroundColor: [
        'rgba(255, 206, 86, 0.6)', // green
        'rgba(75, 192, 192, 0.6)', // yellow
      ],
    },
    ],
  };

  return (
    <div>
      <Doughnut
        data={data}
        width={10}
        height={3}
        options={{
          title: {
            display: true,
            text: 'Saved Jobs vs. Jobs Applied',
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

export default Applications;
