import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';
import { Row, Col, Icon, Card } from 'react-materialize';

import JobStatus from './jobstatus';
import Applications from './applications';
import GithubSkills from './github-skills';

const Analytics = (props) => {
  const hasJobAnalytics = props.savedJobs.length;
  const hasGithubAnalytics = Object.keys(props.githubSkills).length;

  let charts;
  if (hasJobAnalytics && hasGithubAnalytics) {
    charts =
    (<div>
      <Row>
        <Col m={6} s={6}>
          <Card>
            <JobStatus savedJobs={props.savedJobs} />
          </Card>
        </Col>
        <Col m={6} s={6}>
          <Card>
            <Applications savedJobs={props.savedJobs} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col m={6} s={6} offset="s3 m3">
          <Card>
            <GithubSkills githubSkills={props.githubSkills} />
          </Card>
        </Col>
      </Row>
     </div>);
  } else if (hasJobAnalytics) {
    charts =
     (<div>
       <Row>
         <Col m={6} s={6}>
           <Card>
             <JobStatus savedJobs={props.savedJobs} />
           </Card>
         </Col>
         <Col m={6} s={6}>
           <Card>
             <Applications savedJobs={props.savedJobs} />
           </Card>
         </Col>
       </Row>
      </div>);
  } else if (hasGithubAnalytics) {
    charts = (
      <Row>
        <Col m={6} s={6} offset="s3 m3">
          <Card>
            <GithubSkills githubSkills={props.githubSkills} />
          </Card>
        </Col>
      </Row>
    );
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
