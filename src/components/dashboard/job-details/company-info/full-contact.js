import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class FullContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyUrl,
      data: {},
    };
    this.fullContactApiCall = this.fullContactApiCall.bind(this);
  }

  componentDidMount() {
    this.fullContactApiCall()
  }

  fullContactApiCall() {
    axios.post('/api/fullContact', { searchTerm: this.state.searchTerm })
      .then(data => {
        this.setState({
          data: data.data,
        })
      })
  }

  render() {
    return (
      <div id="FullContactComponent">
        <pre><code>{JSON.stringify(this.state.data, null, 4)}</code></pre>
      </div>
    );
  }
}

FullContact.propTypes = {
  companyUrl: PropTypes.string.isRequired,
};
export default FullContact;
