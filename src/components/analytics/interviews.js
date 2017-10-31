import React from 'react';
import axios from 'axios';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';

class Interviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: [],
    };
  }

  componentDidMount() {
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
        console.log(this.state.userEvents);
      })
      .catch(err => console.error(err));
  }

  render() {
    const data = {
      labels: ['Interviews By Date'],
      datasets: [{
        data: [2017-10-31, 2017-10-31, 2017-10-28],
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
        text: 'Interviews By Date',
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
      <div>
        <Pie
          data={data}
          width={10}
          height={3}
          options={options}
        />
      </div>
    );
  }
}

export default Interviews;
