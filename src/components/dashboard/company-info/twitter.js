import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class Twitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      data: {},
    };
    this.twitterApiCall = this.twitterApiCall.bind(this);
  }

  componentDidMount() {
    this.twitterApiCall()
  }

  twitterApiCall() {
    axios.post('/api/Twitter', { searchTerm: this.state.searchTerm })
      .then(data => {
        this.setState({
          data: data.data,
        })
      })
  }

  render() {
    return (
      <div>
        <pre><code>{JSON.stringify(this.state.data, null, 4)}</code></pre>
      </div>
    );
  }
}

Twitter.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default Twitter;
