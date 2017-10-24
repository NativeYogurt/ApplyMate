import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const JobStatus = ({ savedJobs }) => {
  const statusObj = savedJobs.reduce((a, b) => {
    let status = b.status;
    a[status] ? a[status] += 1 : a[status] = 1;
    return a;
  }, {});
  const labels = Object.keys(statusObj);
  const statusData = [];
  labels.forEach(status => statusData.push(statusObj[status]));

  const data = {
    labels, // ['Wishlist', 'Applied', 'Phone', 'OnSite', 'Rejected', 'Offer'],
    datasets: [{
      data: statusData, // data: [25, 10, 4, 6, 2, 0],
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
