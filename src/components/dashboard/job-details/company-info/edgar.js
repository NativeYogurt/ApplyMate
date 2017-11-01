import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import EDGARGraph from './edgarGraph.js';


class EDGAR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      obj: {
        period: [], income: [], RD: [], rev: [],
      },
    };
    this.EDGARApiCall = this.EDGARApiCall.bind(this);
  }

  componentDidMount() {
    this.EDGARApiCall();
  }

  EDGARApiCall() {
    axios.post('/api/EDGAR', { searchTerm: this.state.searchTerm })
      .then(response => {
        this.setState({
          obj: response.data,
        });
      });
  }

  render() {
    return (
      <div id="EDGARComponent">
        {!this.state.obj.period ? (
          <div className="centerText" > This company is not on EDGAR </div>
        ) : (
          <EDGARGraph
            period={this.state.obj.period}
            income={this.state.obj.income}
            RD={this.state.obj.RD}
            rev={this.state.obj.rev}
            symb={this.state.obj.symb}
            companyName={this.state.obj.companyName}
        />
        )}
      </div>
    );
  }
}


export default EDGAR;
