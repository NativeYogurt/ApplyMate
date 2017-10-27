import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BBB from '../company-info/BBB.js'
import Glassdoor from '../company-info/Glassdoor.js'
import EDGAR from '../company-info/edgar.js'
import Twitter from '../company-info/twitter.js'

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.company,
    };
  }

  render() {
    return (
      <div id="companyInformationTab">
        {<Twitter companyName={this.state.companyName} />}
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
