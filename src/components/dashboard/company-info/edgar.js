import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class EDGAR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      arr: [],
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
          arr: response.data,
        })
      })
  }

  render() {
    return (
      <div id="EDGARComponent">
        {this.state.companyName} {' '} <br /> <br />
        <pre><code>{JSON.stringify(this.state.arr, null, 4)}</code></pre>
      </div>
    );
  }
}

EDGAR.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default EDGAR;
