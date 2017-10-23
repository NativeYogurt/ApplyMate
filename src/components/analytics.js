import React from 'react';

import DataChart from './data-chart';

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>DATAVISUAL EXAMPLES:</h3>
        <DataChart />
      </div>
    );
  }
}

export default Analytics;
