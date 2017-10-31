import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class BBB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      companyName: '',
      companyCity: '',
      companyURL: '',
      ratingURL: '',
      rating:'',
      industry: '',
    };
    this.BBBApiCall = this.BBBApiCall.bind(this);
  }

  componentDidMount() {
    this.BBBApiCall()
  }

  BBBApiCall() {
    axios.post('/api/BBB', { searchTerm: this.state.searchTerm })
      .then(data => {
        this.setState({
          companyName: data.data.OrganizationName,
          companyCity: data.data.City,
          companyState: data.data.StateProvince,
          ratingURL: data.data.RatingIcons[0].Url,
          rating: data.data.RatingIcons[0].Url.slice(34).split('.')[0],
          industry: data.data.PrimaryCategory,
        })
      })
  }

  render() {
    return (
      <div id="BBBComponent">
        <img src={this.state.ratingURL} style={{ width: '200px', height: '94px' }} alt={this.state.rating}/>
        <br />
        {this.state.industry}
        <br />
        {this.state.companyName} @ {this.state.companyCity}, {this.state.companyState}
      </div>
    );
  }
}

BBB.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default BBB;
