import React from 'react';
import $ from 'jquery';

import JobNavBar from './JobNavBar';
import JobBoard from './JobBoard';

class JobHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobId: 0,
      company: '',
      jobTitle: '',
      status: '',
      dateApplied: '',
      url: '',
      skills: [],
      companyUrl: '',
      companyInfo: null,
    };
    this.loadData = this.loadData.bind(this);
    this.loadCompanyInfo = this.loadCompanyInfo.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.paramsId !== prevProps.paramsId) {
  //     this.loadData();
  //   }
  // }

  loadData() {
    fetch(`/api/jobs/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          jobId: data.jobId,
          company: data.company,
          jobTitle: data.jobTitle,
          status: data.status,
          dateApplied: data.dateApplied || '',
          url: data.url,
          skills: data.skills,
          companyUrl: data.companyUrl,
        });
      })
      .then(() => {
        if (this.state.companyUrl !== null) {
          this.loadCompanyInfo(this.state.companyUrl);
        }
      });
  }

  loadCompanyInfo(company) {
    const link = `https://api.fullcontact.com/v2/company/lookup.json?domain=${company}&apiKey=${process.env.FULLCONTACT_APIKEY}`;

    $.ajax({
      type: 'GET',
      dataType: 'json',
      header: { 'X-FullContact-APIKey': process.env.FULLCONTACT_APIKEY },
      url: link,
      success: data => {
        this.setState({
          companyInfo: data,
        });
      },
      error: error => {
        console.error('failed to search job', error);
      },
    });
  }
  render() {
    return (
      <div>
        <h3>{this.state.company} | {this.state.jobTitle}</h3>
        <div className="job-detail-navbar">
          <JobNavBar />
        </div>
        <JobBoard
          paramsId={this.props.match.params.id}
          company={this.state.company}
          jobTitle={this.state.jobTitle}
          status={this.state.status}
          dateApplied={this.state.dateApplied}
          url={this.state.url}
          skills={this.state.skills}
          companyUrl={this.state.companyUrl}
          companyInfo={this.state.companyInfo}
          jobId={this.state.jobId}
        />
      </div>
    );
  }
}
export default JobHome;
