import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const CompletionDoughnut = (props) => {
  const data = {
    labels: [
      'Rating',
      '',
    ],
    datasets: [{
      data: [props.rating, Math.round((5 - props.rating) * 10) / 10],
      backgroundColor: [
        '#3EAB2A',
        '#bfbfbf',
      ],
      hoverBackgroundColor: [
        '#A9DDAD',
        '#969393',
      ],
    }],
    options: {
      legend: {
        display: false,
      }
    }
  };
  return (
    <div style={{ width: props.size, height: props.size }} >
      {props.name}
      <Doughnut data={data} />
    </div>
  );
};

export default CompletionDoughnut;
