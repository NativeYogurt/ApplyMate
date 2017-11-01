import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Row, Col, Icon } from 'react-materialize';
import GithubSkills from '../profile/github-skills';

import JobStatus from './jobstatus';
import Applications from './applications';
import Interviews from './interviews';

const Analytics = (props) => {
  const hasJobAnalytics = props.savedJobs.length;
  const hasGithubAnalytics = Object.keys(props.githubSkills).length !== 0;

  return hasJobAnalytics ?
    (
      <div>
        <JobStatus savedJobs={props.savedJobs} />
        <Applications savedJobs={props.savedJobs} />
        {Object.keys(props.githubSkills).length ?
          <GithubSkills
            githubSkills={props.githubSkills}
          /> : null }
      </div>
    ) :
      <div className="empty-state">
        <Row className="center">
          <Col s={12}>
            <Icon medium>insert_chart</Icon>
            <p>Add Jobs To Your Dashboard To Track Your Progress!</p>
          </Col>
        </Row>
      </div>;
};

export default Analytics;

// <Interviews userId={props.userId} />
