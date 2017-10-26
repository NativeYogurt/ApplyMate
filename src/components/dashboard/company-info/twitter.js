import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class Twitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      data: {},
      pic: '/imgs/TempHeader.jpg'
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
          pic: data.data[0].pic,
        })
      })
  }

  render() {
    return (
      <div id="TwitterComponent">  
        <img src={this.state.pic} style={{ width: '1500px', height: '500px' }} alt="hello world" />
        <pre><code>{JSON.stringify(this.state.data, null, 4)}</code></pre>
      </div>
    );
  }
}

Twitter.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default Twitter;
