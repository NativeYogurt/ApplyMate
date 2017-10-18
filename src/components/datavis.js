/* "react/prefer-stateless-function": "off" */

// Victory

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
//
// const data2012 = [
//   { quarter: 1, earnings: 13000 },
//   { quarter: 2, earnings: 16500 },
//   { quarter: 3, earnings: 14250 },
//   { quarter: 4, earnings: 19000 },
// ];
//
// const data2013 = [
//   { quarter: 1, earnings: 15000 },
//   { quarter: 2, earnings: 12500 },
//   { quarter: 3, earnings: 19500 },
//   { quarter: 4, earnings: 13000 },
// ];
//
// const data2014 = [
//   { quarter: 1, earnings: 11500 },
//   { quarter: 2, earnings: 13250 },
//   { quarter: 3, earnings: 20000 },
//   { quarter: 4, earnings: 15500 },
// ];
//
// const data2015 = [
//   { quarter: 1, earnings: 18000 },
//   { quarter: 2, earnings: 13250 },
//   { quarter: 3, earnings: 15000 },
//   { quarter: 4, earnings: 12000 },
// ];
//
// class DataChart extends React.Component {
//   render() {
//     return (
//       <VictoryChart
//         domainPadding={20}
//         theme={VictoryTheme.material}
//       >
//         <VictoryAxis
//           tickValues={[1, 2, 3, 4]}
//           tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
//         />
//         <VictoryAxis
//           dependentAxis
//           tickFormat={(x) => (`$${x / 1000}k`)}
//         />
//         <VictoryStack>
//           <VictoryBar
//             data={data2012}
//             x="quarter"
//             y="earnings"
//           />
//           <VictoryBar
//             data={data2013}
//             x="quarter"
//             y="earnings"
//           />
//           <VictoryBar
//             data={data2014}
//             x="quarter"
//             y="earnings"
//           />
//           <VictoryBar
//             data={data2015}
//             x="quarter"
//             y="earnings"
//           />
//         </VictoryStack>
//       </VictoryChart>
//     )
//   }
// }
//
// // const app = document.getElementById('app');
// // ReactDOM.render(<Main />, app);
// export default DataChart;

// ==============================

// Recharts (*CAN'T GET DATA TO DISPLAY ON CHART)

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { LineChart, Line, CartesianGrid, XAxis, CustomAxisTick, YAxis, Tooltip, Legend } from 'recharts';
//
// const data = [
//   { name: 'Page A', value: 2500, line: 2600 },
//   { name: 'Page B', value: 5000 },
//   { name: 'Page C', value: 7500 },
//   { name: 'Page D', value: 10000 },
// ];
//
// class DataChart extends React.Component {
//     render() {
//       return (
//         <div>
//           <p>HELLO</p>
//           <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//             <Line type="monotone" dataKey="line" stroke="#8884d8" />
//             <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//             <XAxis dataKey="name" />
//             <YAxis dataKey="value"/>
//           </LineChart>
//         </div>
//       )
//     }
// }
//
// export default DataChart;

// ==============================

// react-chartjs-2
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Bar, Line, Pie, Doughnut, Radar, Polar, Scatter } from 'react-chartjs-2';

const data = {
  labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
  datasets: [{
    label: 'Population',
    data: [
      617594,
      381045,
      253060,
      512594,
      420594,
      189045,
    ],
    // backgroundColor:'green',
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

class DataChart extends Component {
  render() {
    return (
      <div>
        <Bar
          data={data}
          options={{
            title: {
              display: true,
              text: 'Largest Cities In Massachusetts',
              fontSize: 25,
            },
            legend: {
              display: false,
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
          }
        }
        />
        <Line
          data={data}
          options={{
            title: {
              display: true,
              text: 'Largest Cities In Massachusetts',
              fontSize: 25,
            },
            legend: {
              display: false,
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
          }
        }
        />
        <Pie
          data={data}
          options={{
            title: {
              display: true,
              text: 'Largest Cities In Massachusetts',
              fontSize: 25,
            },
            legend: {
              display: false,
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
          }
        }
        />
        <Doughnut
          data={data}
          options={{
            title: {
              display: true,
              text: 'Largest Cities In Massachusetts',
              fontSize: 25,
            },
            legend: {
              display: false,
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
          }
        }
        />
        <Radar
          data={data}
          options={{
            title: {
              display: true,
              text: 'Largest Cities In Massachusetts',
              fontSize: 25,
            },
            legend: {
              display: false,
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
          }
        }
        />
        <Polar
          data={data}
          options={{
            title: {
              display: true,
              text: 'Largest Cities In Massachusetts',
              fontSize: 25,
            },
            legend: {
              display: false,
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
          }
        }
        />
      </div>
    );
  }
}

export default DataChart;
