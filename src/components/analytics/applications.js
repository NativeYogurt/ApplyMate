import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Row, Col, Card, Button, Input } from 'react-materialize';

const Applications = ({ savedJobs }) => {
  const statusObj = savedJobs.reduce((a, b) => {
    let status = b.status;
    a[status] ? a[status] += 1 : a[status] = 1;
    return a;
  }, {});

  const numberOfSavedJobs = savedJobs.length;
  const applicationData = [numberOfSavedJobs];
  savedJobs.forEach((job) => {
    let appliedCount = null;
    if (job.status === 'applied') {
      appliedCount++;
      applicationData.push(appliedCount);
    }
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

  const options = {
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
  };

  return (
      <Doughnut
        data={data}
        options={options}
      />
  );
};

export default Applications;
