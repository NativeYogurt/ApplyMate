import React from 'react';
import { Link } from 'react-router-dom';

const ContactEntry = (props) => {
  return (
    <div>
      <div>{props.contact.firstName} {props.contact.lastName}</div>
      <div>{props.contact.jobTitle}</div>
      <Link to={`/home/dashboard/job/contacts/${props.contact.contactId}`}>Edit</Link>
      <button onClick={() => props.deleteContact(props.contact.contactId)}>Delete</button>
    </div>
  );
};

export default ContactEntry;
