import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const BarGraph = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.companyName,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: props.data,
      },
    ],
  };
  const options = {
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
          steps: 10,
          stepValue: 0.5,
          max: 5,
        },
      }],
    },
    legend: {
      display: false,
      position: 'bottom',
    },
  }
  return (
    <div>
      <HorizontalBar data={data} options={options} />
    </div>
  );
};


export default BarGraph;