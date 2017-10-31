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


// {!this.state.companyName ? (
//   <div className="centerText" > This company is not on Glassdoor </div>
//   ) : (
//     <div className="centerText" >
//       {this.state.companyName} @ {this.state.website}, with {this.state.ratingNum} ratings. &nbsp; &nbsp; {'    '}
//       <a href="https://www.glassdoor.com/index.htm"> {'  '} powered by <img src="https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png" title="Job Search" alt="Powered by Glassdoor" /></a>
//     </div>
//   )}


EDGAR.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default EDGAR;
