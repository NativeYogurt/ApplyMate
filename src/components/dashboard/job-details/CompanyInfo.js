import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.company,
      companyUrl: this.props.companyUrl,
      BBBobj: {},
    };
    this.BBBApiCall = this.BBBApiCall.bind(this)
  }

  componentDidMount() {
    this.BBBApiCall()
  }

  BBBApiCall() {
    axios.post('/api/BBB', { searchTerm: this.state.companyName })
      .then(data => {
        const obj = {};
        obj.companyName = data.data.OrganizationName;
        obj.companyCity = data.data.City,
        obj.companyState = data.data.StateProvince,
        obj.ratingURL = data.data.RatingIcons[0].Url,
        obj.rating = data.data.RatingIcons[0].Url.slice(34).split('.')[0],
        obj.industry = data.data.PrimaryCategory,
        this.setState({
          BBBobj: obj,
        });
      })
      .then(console.log(this.state.BBBobj))
  }


  render() {
    return (
      <div>
        Props:
        {this.state.companyName} {' '} {this.state.companyUrl} <br />
        BBB: <br />
        {this.state.BBBobj.companyName} <br />
        {this.state.BBBobj.companyCity} <br />
        {this.state.BBBobj.companyState} <br />
        <img src={this.state.BBBobj.ratingURL} alt={this.state.BBBobj.rating} /> <br />
        {this.state.BBBobj.rating} <br />
        {this.state.BBBobj.industry} <br />
      </div>
    );
  }
}

CompanyInfo.propTypes = {
  company: PropTypes.string.isRequired,
  companyUrl: PropTypes.string.isRequired,
};
export default CompanyInfo;
