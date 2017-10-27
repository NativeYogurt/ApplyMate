import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CompletionDoughnut from './completion-doughnut.js';
import BarGraph from './bar-graph.js';


class Glassdoor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      website: '',
      companyName: '',
      ratingNum: 0,
      cultureAndValuesRating: 0,
      seniorLeadershipRating: 0,
      compensationAndBenefitsRating: 0,
      careerOpportunitiesRating: 0,
      workLifeBalanceRating: 0,
      recommendToFriendRating: 0,
      bossApprove: 0,
      bossDisapp: 0,
      barRatings: [],
      obj: {},
    };
    this.GlassdoorApiCall = this.GlassdoorApiCall.bind(this);
  }

  componentDidMount() {
    this.GlassdoorApiCall();
  }

  GlassdoorApiCall() {
    axios.post('/api/Glassdoor', { searchTerm: this.state.searchTerm })
      .then(res => {
        const data = res.data.response.employers[0];
        const barRatings = [];
        barRatings.push({ 'Culture and Values': data.cultureAndValuesRating });
        barRatings.push({ 'Senior Leadership': data.seniorLeadershipRating });
        barRatings.push({ 'Compensation and Benefits': data.compensationAndBenefitsRating });
        barRatings.push({ 'Career Opportunities': data.careerOpportunitiesRating });
        barRatings.push({ 'Work/Life Balance': data.workLifeBalanceRating });
        this.setState({
          barRatings,
          companyName: data.name,
          website: data.website,
          ratingNum: data.numberOfRatings,
          overallRating: data.overallRating,
          recommendToFriendRating: data.recommendToFriendRating / 20 ,
          bossApprove: data.ceo.pctApprove /20 ,
          obj: data,
        });
      });
  }

  render() {
    return (
      <div id="GlassdoorComponent">
        <br />
        <div id="GlassdoorDoughnuts">
          <CompletionDoughnut name="Recommend To Friend" rating={this.state.recommendToFriendRating} size="225px" />
          <CompletionDoughnut name="Overall Rating" rating={this.state.overallRating} size="300px" />
          <CompletionDoughnut name="CEO Approval" rating={this.state.bossApprove} size="225px" />
        </div>
        <div>
          <BarGraph />
        </div>
        <pre><code>{JSON.stringify(this.state.obj, null, 4)}</code></pre>
        <br />
        <a href="https://www.glassdoor.com/index.htm">powered by <img src="https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png" title="Job Search" alt="Powered by Glassdoor" /></a>
      </div>
    );
  }
}

Glassdoor.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default Glassdoor;
