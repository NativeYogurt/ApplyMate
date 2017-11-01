import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Row, Col, Icon } from 'react-materialize';
import GithubSkills from '../profile/github-skills';

import JobStatus from './jobstatus';
import Applications from './applications';
import Interviews from './interviews';

const Analytics = (props) => {
  const hasJobAnalytics = props.savedJobs.length;
  const hasGithubAnalytics = Object.keys(props.githubSkills).length;

  let charts;
  if (hasJobAnalytics && hasGithubAnalytics) {
    charts =
    (<div>
      <JobStatus savedJobs={props.savedJobs} />
      <Applications savedJobs={props.savedJobs} />
      <GithubSkills githubSkills={props.githubSkills} />
     </div>);
  } else if (hasJobAnalytics) {
    charts =
     (<div>
       <JobStatus savedJobs={props.savedJobs} />
       <Applications savedJobs={props.savedJobs} />
      </div>);
  } else if (hasGithubAnalytics) {
    charts = <GithubSkills githubSkills={props.githubSkills} />;
  } else {
    charts =
    (<div className="empty-state">
      <Row className="center">
        <Col s={12}>
          <Icon medium>insert_chart</Icon>
          <p>Add Jobs To Your Dashboard To Track Your Progress!</p>
        </Col>
      </Row>
     </div>);
  }
  return (
    <div>{charts}</div>
  );
};

export default Analytics;
