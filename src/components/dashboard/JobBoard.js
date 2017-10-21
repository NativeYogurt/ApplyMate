import React from 'react';
import { HashRouter, browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

import JobEdit from './JobEdit';
import CompanyInfo from './CompanyInfo';

class JobBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    fetch(`/api/jobs/${this.props.paramsId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
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
      this.state.company ?
        (
          <div>
            <Switch>
              <Route
                path="/home/dashboard/:id/company"
                render={() => (
                  <CompanyInfo
                    companyInfo={this.state.companyInfo}
                  />
                )}
              />
              <Route
                path="/home/dashboard/:id"
                render={() => (
                  <JobEdit
                    company={this.state.company}
                    jobTitle={this.state.jobTitle}
                    status={this.state.status}
                    dateApplied={this.state.dateApplied}
                    url={this.state.url}
                    skills={this.state.skills}
                    companyUrl={this.state.companyUrl}
                    paramsId={this.props.paramsId}
                    loadData={this.loadData}
                  />
                )}
              />
            </Switch>
          </div>) : null
    );
  }
}

export default JobBoard;
