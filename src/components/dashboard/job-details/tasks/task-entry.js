import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Input, Card } from 'react-materialize';

const TaskEntry = (props) => {
  return (
    <Card>
      <div>{props.task.taskDesc}</div>
      <div>Due: {props.task.taskDueDate}</div>
      <Button onClick={() => props.deleteTask(props.task.taskId)} icon="delete" />
    </Card>
  );
};

export default TaskEntry;
