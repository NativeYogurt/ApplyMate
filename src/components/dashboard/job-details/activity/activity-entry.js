import React from 'react';
import { Link } from 'react-router-dom';

const ActivityEntry = (props) => {
  return (
    <div>
      <div>{props.activity.eventType}</div>
      <div>{props.activity.eventDate} {props.activity.eventTime}</div>
      <div>{props.activity.eventParticipates}</div>
      <Link to={`/home/dashboard/job/activity/${props.activity.eventId}`}>Edit</Link>
      <button onClick={() => props.deleteActivity(props.activity.eventId)}>Delete</button>
    </div>
  );
};

export default ActivityEntry;
