import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Input, Card } from 'react-materialize';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

const TaskEntry = (props) => {
  return (
    <Card>
      <div>{props.task.taskDesc}</div>
      <div>Due: {props.task.taskDueDate ? moment(props.task.taskDueDate).format('MMM Do YYYY') : ''}</div>
      <Button onClick={() => props.deleteTask(props.task.taskId)} className="delete icon-button" icon="delete" data-tip="Delete" />
      <ReactTooltip />
    </Card>
  );
};

export default TaskEntry;
