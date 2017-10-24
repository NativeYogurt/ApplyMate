import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Applications = ({ savedJobs }) => {
  const statusObj = savedJobs.reduce((a, b) => {
    let status = b.status;
    a[status] ? a[status] += 1 : a[status] = 1;
    return a;
  }, {});
  const labels = Object.keys(statusObj);
  const numberOfSavedJobs = savedJobs.length;
  const applicationData = [numberOfSavedJobs];

  labels.forEach((status) => {
    let appliedCount = null;
    status === 'applied' ? appliedCount++ : null
    applicationData.push(appliedCount);
  });

  const data = {
    labels: ['Saved Jobs', 'Applied'],
    datasets: [{
      data: applicationData,
      backgroundColor: [
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
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
