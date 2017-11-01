import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Input, Card } from 'react-materialize';

const ActivityEntry = (props) => {
  return (
    <Row>
      <Col s={6}>
        <Card>
          <div>{props.activity.eventType}</div>
          <div>{props.activity.eventDate} {props.activity.eventTime}</div>
          <div>{props.activity.eventParticipates}</div>
          <div><Link to={`/home/dashboard/${props.jobId}/activity/${props.activity.eventId}`}>Edit</Link></div>
          <Button onClick={() => props.deleteActivity(props.activity.eventId)} icon="delete" />
        </Card>
      </Col>
    </Row>
  );
};

export default ActivityEntry;
