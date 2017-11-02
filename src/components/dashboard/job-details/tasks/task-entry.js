import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Input, Card } from 'react-materialize';
import ReactTooltip from 'react-tooltip';

const TaskEntry = (props) => {
  return (
    <Card>
      <div>{props.task.taskDesc}</div>
      <div>Due: {props.task.taskDueDate}</div>
      <Button onClick={() => props.deleteTask(props.task.taskId)} icon="delete" data-tip="Delete" />
      <ReactTooltip />
    </Card>
  );
};

export default TaskEntry;
