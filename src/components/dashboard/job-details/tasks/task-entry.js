import React from 'react';
import { Link } from 'react-router-dom';

const TaskEntry = (props) => {
  return (
    <div>
      <div>{props.task.taskDesc}</div>
      <div>Due: {props.task.taskDueDate}</div>
      <button onClick={() => props.deleteTask(props.task.taskId)}>Delete</button>
    </div>
  );
};

export default TaskEntry;
