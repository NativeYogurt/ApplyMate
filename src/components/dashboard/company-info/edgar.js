import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class EDGAR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      companyName: '',
      stockSymb: '',
      arr: [],
    };
    this.getStockSymb = this.getStockSymb.bind(this);
    this.EDGARApiCall = this.EDGARApiCall.bind(this)
  }

  componentDidMount() {
    this.getStockSymb()
  }

  getStockSymb() {
    axios.post('/api/getStockSymb', { searchTerm: this.state.searchTerm })
      .then(data => {
        if(data.data[0]) {
          this.setState({
            companyName: data.data[0].name,
            stockSymb: data.data[0].symbol,
          }, () => { this.EDGARApiCall(); });
        } else {
          this.setState({
            companyName: 'This company is not',
            stockSymb: 'publically traded',
          })
        }
      })
  }

  EDGARApiCall() {
    axios.post('/api/EDGAR', { searchTerm: this.state.stockSymb })
      .then(response => {
        this.setState({
          arr: response.data,
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.companyName} {' '} {this.state.stockSymb} <br /> <br />
        <pre><code>{JSON.stringify(this.state.arr, null, 4)}</code></pre>
      </div>
    );
  }
}

EDGAR.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default EDGAR;
