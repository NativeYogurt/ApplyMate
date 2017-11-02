import React from 'react';
import axios from 'axios';
import { Card } from 'react-materialize';

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
      location: '',
      url: '',
      skills: [],
      companyUrl: '',
      companyInfo: null,
      notes: '',
      userId: '',
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
          location: data.location,
          url: data.url,
          skills: data.skills,
          companyUrl: data.companyUrl,
          notes: data.notes,
          userId: data.userId,
        });
      });
  }

  render() {
    return (
      <div className="bg-job">
      <div className="container">
        <Card>
          <h5>{this.state.company} | {this.state.jobTitle}</h5>
          <div className="job-detail-navbar">
            <JobNavBar
              jobId={this.state.jobId}
            />
          </div>
          <JobBoard
            paramsId={this.props.match.params.id}
            company={this.state.company}
            jobTitle={this.state.jobTitle}
            status={this.state.status}
            dateApplied={this.state.dateApplied}
            location={this.state.location}
            url={this.state.url}
            companyUrl={this.state.companyUrl}
            skills={this.state.skills}
            notes={this.state.notes}
            jobId={this.state.jobId}
            userId={this.state.userId}
          />
        </Card>
      </div>
      </div>
    );
  }
}
export default JobHome;
