import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Input, Card } from 'react-materialize';
import ReactTooltip from 'react-tooltip';

const ContactEntry = (props) => {
  return (
    <Row>
      <Col s={6}>
        <Card>
          <div>{props.contact.firstName} {props.contact.lastName}</div>
          <div>{props.contact.jobTitle}</div>
          <div><Link to={`/home/dashboard/${props.jobId}/contacts/${props.contact.contactId}`}>Edit</Link></div>
          <Button onClick={() => props.deleteContact(props.contact.contactId)} icon="delete" data-tip="Delete" />
        </Card>
      </Col>
      <ReactTooltip />
    </Row>
  );
};

export default ContactEntry;
