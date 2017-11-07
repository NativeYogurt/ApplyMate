import React from 'react';
import { Pie, Radar } from 'react-chartjs-2';

const GithubSkills = (props) => {
  const labels = Object.keys(props.githubSkills);
  const skillData = [];
  labels.forEach(skill => skillData.push(props.githubSkills[skill] * .000001));

  const data = {
    labels,
    datasets: [{
      label: 'Github Data',
      data: skillData,
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

  const options = {
    title: {
      display: true,
      text: 'Your Most Used Languages On Github (MegaBytes)',
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
        left: 0,
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
    <Pie
      data={data}
      options={options}
    />
  );
};

export default GithubSkills;
