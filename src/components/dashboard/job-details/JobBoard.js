import React from 'react';
import { HashRouter, browserHistory, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import JobEdit from './JobEdit';
import CompanyInfo from './CompanyInfo';
import Contacts from './contacts/contacts';
import ContactAdd from './contacts/contact-add';
import ContactEdit from './contacts/contact-edit';
import Activity from './activity/activities';
import ActivityAdd from './activity/activity-add';
import ActivityEdit from './activity/activity-edit';
import Resources from './resources/resources';
import Tasks from './tasks/tasks';

const JobBoard = (props) => {
  return (
    (props.url || props.company) ?
      (
        <div>
          <Switch>
            <Route
              path={`/home/dashboard/${props.jobId}/resources`}
              render={() => (
                <Resources
                  jobId={props.jobId}
                  userId={props.userId}
                />
              )}
            />
            <Route
              path={`/home/dashboard/${props.jobId}/company`}
              render={() => (
                <CompanyInfo
                  company={props.company}
                  companyUrl={props.companyUrl}
                />
              )}
            />
            <Route
              path={`/home/dashboard/${props.jobId}/contacts/new`}
              render={() => (
                <ContactAdd
                  jobId={props.jobId}
                />
              )}
            />
            <Route
              path={`/home/dashboard/${props.jobId}/contacts/:id`}
              component={ContactEdit}
            />
            <Route
              path={`/home/dashboard/${props.jobId}/contacts`}
              render={() => (
                <Contacts
                  jobId={props.jobId}
                />
              )}
            />
            <Route
              path={`/home/dashboard/${props.jobId}/activity/new`}
              render={() => (
                <ActivityAdd
                  jobId={props.jobId}
                  userId={props.userId}
                />
              )}
            />
            <Route
              path={`/home/dashboard/${props.jobId}/activity/:id`}
              component={ActivityEdit}
            />
            <Route
              path={`/home/dashboard/${props.jobId}/activity`}
              render={() => (
                <Activity
                  jobId={props.jobId}
                />
              )}
            />
            <Route
              path={`/home/dashboard/${props.jobId}/tasks`}
              render={() => (
                <Tasks
                  jobId={props.jobId}
                  userId={props.userId}
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
                  location={props.location}
                  url={props.url}
                  skills={props.skills}
                  companyUrl={props.companyUrl}
                  notes={props.notes}
                  paramsId={props.paramsId}
                  jobId={props.jobId}
                />
              )}
            />
          </Switch>
        </div>) : null
  );
};

export default JobBoard;
