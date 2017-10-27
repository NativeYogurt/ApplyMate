import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-materialize';

const JobSearchResult = (props) => {
  return (
    <Col m={6} s={6}>
      <Card>
        <div>Job Title: {props.job.title}</div>
        <div>Company: {props.job.company}</div>
        <div>Location: {props.job.location}</div>
        <div>Company URL: <a href={props.job.company_url} target="_blank">{props.job.company_url}</a></div>
        <div>Created at: {props.job.created_at}</div>
        <div><a href={props.job.url} target="_blank">Job Post</a></div>
        <div><Button onClick={() => props.handleJobAdd(props.job)}>Add to Dashboard</Button></div>
        <br />
      </Card>
    </Col>
  );
};

JobSearchResult.propTypes = {
  company: PropTypes.string.isRequired,
};

export default JobSearchResult;
