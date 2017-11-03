import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CompletionDoughnut from './completion-doughnut.js';
import GDBarGraph from './gdBarGraph.js';


class Glassdoor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      website: '',
      companyName: '',
      ratingNum: 0,
      recommendToFriendRating: 0,
      bossApprove: 0,
      barKeys: ['Culture and Values', 'Senior Leadership', 'Compensation and Benefits', 'Career Opportunities', 'Work/Life Balance'],
      barVals: [],
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
        const barVals = [];
        barVals.push(data.cultureAndValuesRating);
        barVals.push(data.seniorLeadershipRating);
        barVals.push(data.compensationAndBenefitsRating);
        barVals.push(data.careerOpportunitiesRating);
        barVals.push(data.workLifeBalanceRating);
        this.setState({
          barVals,
          companyName: data.name,
          website: data.website,
          ratingNum: data.numberOfRatings,
          overallRating: data.overallRating,
          recommendToFriendRating: data.recommendToFriendRating / 20,
          bossApprove: data.ceo.pctApprove / 20,
          obj: data,
        });
      });
  }

  render() {
    return (
      <div>
        {!this.state.companyName ? (
          <div className="centerText" > This company is not on Glassdoor </div>
          ) : (
            <div id="GlassdoorComponent">
              <div className="centerText" >
                {this.state.companyName} @ {this.state.website}, with {this.state.ratingNum} ratings. &nbsp; &nbsp; {'    '}
                <a href="https://www.glassdoor.com/index.htm"> {'  '} powered by <img src="https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png" title="Job Search" alt="Powered by Glassdoor" /></a>
              </div>
              <div id="glassdoorDoughnuts">
                <CompletionDoughnut name="Recommend To Friend" rating={this.state.recommendToFriendRating} id="GDD1" size="195px" />
                <CompletionDoughnut name="Overall Rating" rating={this.state.overallRating} id="GDD2" size="223px" />
                <CompletionDoughnut name="CEO Approval" rating={this.state.bossApprove} id="GDD3" size="195px" />
              </div>
              <div>
                <GDBarGraph data={this.state.barVals} labels={this.state.barKeys} companyName={this.state.companyName} />
              </div>
            </div>
          )}
      </div>
    );
  }
}

Glassdoor.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default Glassdoor;
