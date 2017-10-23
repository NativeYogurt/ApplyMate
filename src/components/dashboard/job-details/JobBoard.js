import React from 'react';
import { HashRouter, browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import JobEdit from './JobEdit';
import CompanyInfo from './CompanyInfo';
import Contacts from './contacts/contacts';
import ContactAdd from './contacts/contact-add';
import ContactEdit from './contacts/contact-edit';

const JobBoard = (props) => {
  return (
    (props.url || props.company) ?
      (
        <div>
          <Switch>
            <Route
              path="/home/dashboard/job/company"
              render={() => (
                <CompanyInfo
                  companyInfo={props.companyInfo}
                />
              )}
            />
            <Route
              path="/home/dashboard/job/contacts/new"
              render={() => (
                <ContactAdd
                  jobId={props.jobId}
                />
              )}
            />
            <Route
              path="/home/dashboard/job/contacts/:id"
              component={ContactEdit}
            />
            <Route
              path="/home/dashboard/job/contacts"
              render={() => (
                <Contacts
                  jobId={props.jobId}
                />
              )}
            />
            <Route
              path="/home/dashboard/:id"
              render={() => (
                <JobEdit
                  company={props.company}
                  jobTitle={props.jobTitle}
                  status={props.status}
                  dateApplied={props.dateApplied}
                  url={props.url}
                  skills={props.skills}
                  companyUrl={props.companyUrl}
                  paramsId={props.paramsId}
                />
              )}
            />
          </Switch>
        </div>) : null
  );
}

export default JobBoard;
