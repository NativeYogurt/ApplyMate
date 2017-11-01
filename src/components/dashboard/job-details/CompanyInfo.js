import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BBB from './company-info/BBB.js';
import Glassdoor from './company-info/Glassdoor.js';
import EDGAR from './company-info/edgar.js';
import Twitter from './company-info/twitter.js';
import TwitterBanner from './company-info/twitterBanner.js';
import FullContact from './company-info/full-contact.js';
import Tradier from './company-info/tradier.js';

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.company,
      companyUrl: this.props.companyUrl,
      // stockSymbs: [[]],
      twitterData: [],
      twitterPic: '/imgs/TempHeader.jpg',
    };
    this.twitterApiCall = this.twitterApiCall.bind(this);
    // this.yahooApiCall = this.yahooApiCall.bind(this);
  }

  componentDidMount() {
    this.twitterApiCall();
    // this.yahooApiCall();
  }

  twitterApiCall() {
    axios.post('/api/Twitter', { searchTerm: this.state.companyName })
      .then(data => {
        if (data.data[0].url !== 'www.twitter.com/IAmKennyTso') {
          this.setState({
            twitterData: data.data,
            twitterPic: data.data[0].pic || this.state.twitterPic,
          });
        }
      });
  }

  // yahooApiCall() {
  //   axios.post('/api/yahoo', { searchTerm: this.state.companyName })
  //     .then(data => {
  //       this.setState({
  //         stockSymbs: data.data,
  //       });
  //     });
  // }

  render() {
    return ( 
      <div id="companyInformationTab">
        <TwitterBanner twitterPic={this.state.twitterPic} />
        <div id="companyInformationLeft">
          <Twitter twitterData={this.state.twitterData} />
          <FullContact companyUrl={this.state.companyUrl} />
        </div>
        <div id="companyInformationRight">
          <Glassdoor companyName={this.state.companyName} />
          <EDGAR companyName={this.state.companyName} />
          {/* Alex said no stock info... */}
          {/* <Tradier companyName={this.state.companyName} /> */}
        </div>
      </div>
    );
  }
}
{/* {<BBB companyName={this.state.companyName} />} */}
CompanyInfo.propTypes = {
  company: PropTypes.string.isRequired,
};
export default CompanyInfo;
