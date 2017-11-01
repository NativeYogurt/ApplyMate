import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class Tradier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      data: {},
    };
    this.tradierApiCall = this.tradierApiCall.bind(this);
  }

  componentDidMount() {
    this.tradierApiCall()
  }

  tradierApiCall() {
    axios.post('/api/Tradier', { searchTerm: this.state.searchTerm })
      .then(data => {
        this.setState({
          data: data.data,
        })
      })
  }

  render() {
    return (
      <div id="TradierComponent">
        <pre><code>{JSON.stringify(this.state.data, null, 4)}</code></pre>
      </div>
    );
  }
}

export default Tradier;
