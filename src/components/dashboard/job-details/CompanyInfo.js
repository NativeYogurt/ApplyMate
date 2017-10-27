import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BBB from '../company-info/BBB.js'
import Glassdoor from '../company-info/Glassdoor.js'
import EDGAR from '../company-info/edgar.js'
import Twitter from '../company-info/twitter.js'
import TwitterBanner from '../company-info/twitterBanner.js'
class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.company,
      twitterData: [],
      twitterPic: '/imgs/TempHeader.jpg'
    };
    this.twitterApiCall = this.twitterApiCall.bind(this);
  }

  componentDidMount() {
    this.twitterApiCall();
  }

  twitterApiCall() {
    axios.post('/api/Twitter', { searchTerm: this.state.companyName })
      .then(data => {
        this.setState({
          twitterData: data.data,
          twitterPic: data.data[0].pic,
        });
      });
  }

  render() {
    return (
      <div id="companyInformationTab">
        {<Twitter twitterData={this.state.twitterData} />}
        <TwitterBanner twitterPic={this.state.twitterPic} />
        {/* {<BBB companyName={this.state.companyName} />} */}
        {<Glassdoor companyName={this.state.companyName} />}
        {/* {<EDGAR companyName={this.state.companyName} />} */}
      </div>
    );
  }
}

CompanyInfo.propTypes = {
  company: PropTypes.string.isRequired,
};
export default CompanyInfo;
