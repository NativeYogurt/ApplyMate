import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class Glassdoor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      website: '',
      companyName:'',
      ratingNum: 0,
      cultureAndValuesRating: 0,
      seniorLeadershipRating: 0,
      compensationAndBenefitsRating: 0,
      careerOpportunitiesRating: 0,
      workLifeBalanceRating: 0,
      recommendToFriendRating: 0,
      industry: '',
      bossApprove: 0,
      bossDisapp: 0,
      bossRatingNum: 0,
      obj: {},
    };
    this.GlassdoorApiCall = this.GlassdoorApiCall.bind(this);
  }

  componentDidMount() {
    this.GlassdoorApiCall()
  }

  GlassdoorApiCall() {
    axios.post('/api/Glassdoor', { searchTerm: this.state.searchTerm })
      .then(res => {
        console.log(res)
        const data = res.data.response.employers[0]
        this.setState({
          companyName: data.name,
          website: data.website,
          ratingNum: data.numberOfRatings,
          cultureAndValuesRating: data.cultureAndValuesRating,
          seniorLeadershipRating: data.seniorLeadershipRating,
          compensationAndBenefitsRating: data.compensationAndBenefitsRating,
          careerOpportunitiesRating: data.careerOpportunitiesRating,
          workLifeBalanceRating: data.workLifeBalanceRating,
          recommendToFriendRating: data.recommendToFriendRating,
          industry: data.sectorName,
          bossApprove: data.ceo.pctApprove,
          bossDisapp: data.ceo.pctDisapprove,
          bossRatingNum: data.ceo.numberOfRatings,
          obj: res,
        })
      })
  }

  render() {
    return (
      <div>
        <br />
        {this.state.companyName} @ {this.state.website}<br />
        ratingNum: {this.state.ratingNum}<br />
        cultureAndValuesRating: {this.state.cultureAndValuesRating}<br />
        seniorLeadershipRating: {this.state.seniorLeadershipRating}<br />
        compensationAndBenefitsRating: {this.state.compensationAndBenefitsRating}<br />
        careerOpportunitiesRating: {this.state.careerOpportunitiesRating}<br />
        workLifeBalanceRating: {this.state.workLifeBalanceRating}<br />
        recommendToFriendRating: {this.state.recommendToFriendRating}<br />
        industry: {this.state.industry}<br />
        bossApprove: {this.state.bossApprove}<br />
        bossDisapp: {this.state.bossDisapp}<br />
        bossRatingNum: {this.state.bossRatingNum}<br />
        industry: {this.state.industry}
        <br />
        <pre><code>{JSON.stringify(this.state.obj, null, 4)}</code></pre>
      </div>
    );
  }
}

Glassdoor.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default Glassdoor;
