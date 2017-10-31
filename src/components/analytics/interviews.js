import React from 'react';
import axios from 'axios';
import { Bar, Line, Pie, Doughnut, Radar, Polar, Bubble } from 'react-chartjs-2';

class Interviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: [],
    };
  }

  componentWillMount() {
    axios.get('/api/activitiesbyuser', {
      params: {
        userId: this.props.userId,
      },
    })
      .then(events => {
        const date = events.data.map((event) => event.eventDate);
        this.setState({
          userEvents: date,
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const eventFullDates = this.state.userEvents;
    const eventDayDates = eventFullDates.map((date) => date.slice(8));
    const nums = [];
    eventDayDates.forEach(x => nums.push(Number(x)));

    // const data = {
    //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    //   datasets: [{
    //     data: nums, // [10,12,49],
    //     backgroundColor: [
    //       'rgba(255, 99, 132, 0.6)',
    //       'rgba(54, 162, 235, 0.6)',
    //       'rgba(255, 206, 86, 0.6)',
    //       'rgba(75, 192, 192, 0.6)',
    //       'rgba(153, 102, 255, 0.6)',
    //       'rgba(255, 159, 64, 0.6)',
    //       'rgba(255, 99, 132, 0.6)',
    //     ],
    //   },
    //   ],
    // };

    // const data = {
    //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    //   datasets: [
    //     {
    //       label: 'Interviewed On Date',
    //       fill: false,
    //       lineTension: 0.1,
    //       backgroundColor: 'rgba(75,192,192,0.4)',
    //       borderColor: 'rgba(75,192,192,1)',
    //       borderCapStyle: 'butt',
    //       borderDash: [],
    //       borderDashOffset: 0.0,
    //       borderJoinStyle: 'miter',
    //       pointBorderColor: 'rgba(75,192,192,1)',
    //       pointBackgroundColor: '#fff',
    //       pointBorderWidth: 1,
    //       pointHoverRadius: 5,
    //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //       pointHoverBorderColor: 'rgba(220,220,220,1)',
    //       pointHoverBorderWidth: 2,
    //       pointRadius: 1,
    //       pointHitRadius: 10,
    //       data: nums,
    //     },
    //   ],
    // };
    //
    // const options = {
    //   title: {
    //     display: true,
    //     text: 'Interviews By Date',
    //     fontSize: 25,
    //   },
    //   legend: {
    //     display: false,
    //     position: 'top',
    //     labels: {
    //       fontColor: '#000',
    //     },
    //   },
    //   layout: {
    //     padding: {
    //       left: 50,
    //       right: 0,
    //       bottom: 0,
    //       top: 0,
    //     },
    //   },
    //   tooltips: {
    //     enabled: true,
    //   },
    //   scales: {
    //     yAxes: [{
    //       ticks: {
    //         beginAtZero: true,
    //         steps: 10,
    //         stepValue: 0.5,
    //         max: 35,
    //       },
    //     }],
    //   },
    //   maintainAspectRatio: true,
    // };

    // const data = {
    //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    //   datasets: [
    //     {
    //       label: 'Interviews By Date',
    //       fill: false,
    //       lineTension: 0.1,
    //       backgroundColor: 'rgba(75,192,192,0.4)',
    //       borderColor: 'rgba(75,192,192,1)',
    //       borderCapStyle: 'butt',
    //       borderDash: [],
    //       borderDashOffset: 0.0,
    //       borderJoinStyle: 'miter',
    //       pointBorderColor: 'rgba(75,192,192,1)',
    //       pointBackgroundColor: '#fff',
    //       pointBorderWidth: 1,
    //       pointHoverRadius: 5,
    //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //       pointHoverBorderColor: 'rgba(220,220,220,1)',
    //       pointHoverBorderWidth: 2,
    //       pointRadius: 1,
    //       pointHitRadius: 10,
    //       data: nums,
    //     },
    //   ],
    // };

    // const options = {
    //   title: {
    //     display: true,
    //     text: 'Saved Jobs By Status',
    //     fontSize: 25,
    //   },
    //   legend: {
    //     display: true,
    //     position: 'top',
    //     labels: {
    //       fontColor: '#000',
    //     },
    //   },
    //   layout: {
    //     padding: {
    //       left: 50,
    //       right: 0,
    //       bottom: 0,
    //       top: 0,
    //     },
    //   },
    //   tooltips: {
    //     enabled: true,
    //   },
    //   scales: {
    //     xAxes: [{
    //       ticks: {
    //         beginAtZero: true,
    //         steps: 10,
    //         stepValue: 1,
    //         max: 5,
    //       },
    //     }],
    //   },
    //   maintainAspectRatio: true,
    // };

    const data = {
      labels: ['January'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [{ x: 10, y: 20, r: 5 }],
        },
      ],
    };

    return (
      <div>
        <Bubble
          data={data}
          width={10}
          height={3}
        />
      </div>
    );
  }
}

export default Interviews;
