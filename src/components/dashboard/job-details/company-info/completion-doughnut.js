import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const CompletionDoughnut = (props) => {
  const data = {
    labels: [
      'Rating',
      ''
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
  };
  const options = {
    legend: {
      display: false,
    }
  }
  return (
    <div className="GDdoughnut" id={props.id} style={{ maxWidth: '100%', maxHeight: '100%' }} >
      <div className="centerText"> {props.name} </div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CompletionDoughnut;
