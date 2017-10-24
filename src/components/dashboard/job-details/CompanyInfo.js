import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BBB from '../company-info/BBB.js'
import Glassdoor from '../company-info/Glassdoor.js'
import EDGAR from '../company-info/edgar.js'

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.company,
      companyUrl: this.props.companyUrl,
    };
  }

  render() {
    return (
      <div>
        <BBB companyName={this.state.companyName} />
        <br />
        <Glassdoor companyName={this.state.companyName} />
        <br />
        {/* <EDGAR companyName={this.state.companyName} /> */}
      </div>
    );
  }
}

CompanyInfo.propTypes = {
  company: PropTypes.string.isRequired,
  companyUrl: PropTypes.string.isRequired,
};
export default CompanyInfo;
