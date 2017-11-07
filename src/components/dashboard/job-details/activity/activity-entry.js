import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Input, Card } from 'react-materialize';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

const ActivityEntry = (props) => {
  return (
    <Row>
      <Col s={6}>
        <Card>
          <div>{props.activity.eventType}</div>
          <div>{moment(props.activity.eventDate).format('MMM Do YYYY')} {props.activity.eventTime}</div>
          <div>{props.activity.eventParticipates}</div>
          <div><Link to={`/home/dashboard/${props.jobId}/activity/${props.activity.eventId}`}>Edit</Link></div>
          <Button onClick={() => props.deleteActivity(props.activity.eventId)} icon="delete" data-tip="Delete" className="delete icon-button" />
        </Card>
      </Col>
      <ReactTooltip />
    </Row>
  );
};

export default ActivityEntry;
