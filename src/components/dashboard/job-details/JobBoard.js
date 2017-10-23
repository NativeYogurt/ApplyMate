import React from 'react';
import { HashRouter, browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import JobEdit from './JobEdit';
import CompanyInfo from './CompanyInfo';
import Contacts from './contacts';
import ContactAdd from './contact-add';

const JobBoard = (props) => {
  return (
    props.company ?
      (
        <div>
          <Switch>
            <Route
              path="/home/dashboard/:id/company"
              render={() => (
                <CompanyInfo
                />
              )}
            />
            <Route
              path="/home/dashboard/:id/contacts/new"
              render={() => (
                <ContactAdd
                  jobId={props.jobId}
                />
              )}
            />
            <Route
              path="/home/dashboard/:id/contacts"
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
