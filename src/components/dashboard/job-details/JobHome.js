import React from 'react';
import axios from 'axios';

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
    };
    this.loadData = this.loadData.bind(this);
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
          companyUrl={this.state.companyUrl}
          skills={this.state.skills}
          jobId={this.state.jobId}
        />
      </div>
    );
  }
}
export default JobHome;
