import React from 'react';
import { Bar } from 'react-chartjs-2';

const EDGARGraph = (props) => {
  const data = {
    labels: props.period,
    datasets: [
      {
        label: 'R&D Spending',
        backgroundColor: '',
        borderColor: '#F4B947',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: props.RD,
      },
      {
        label: 'Pre-Tax Income',
        backgroundColor: '#80A360',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: props.income,
      },
      {
        label: 'Total Rev',
        backgroundColor: '#BBD1DF',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: props.rev,
      },
    ],
  };
  const options = {
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true,
        },
      }],
    }
  }
  return (
    <div>
      <div className="centerText" > 
        {props.companyName}, Stock Symbol: {props.symb}
      </div>
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

export default EDGARGraph;