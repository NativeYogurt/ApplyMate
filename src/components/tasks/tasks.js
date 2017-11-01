import React from 'react';
import axios from 'axios';
import { Row, Col, Input, Button, Card } from 'react-materialize';

import TaskEntry from './task-entry';
import Error from '../dashboard/errorBanner';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDesc: '',
      taskDueDate: '',
      tasks: [],
      errorMessage: null,
    };
    this.onChangeTaskDesc = this.onChangeTaskDesc.bind(this);
    this.onChangeTaskDueDate = this.onChangeTaskDueDate.bind(this);
    this.submit = this.submit.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.createTasks = this.createTasks.bind(this);
  }
  componentDidMount() {
    this.getTasks();
  }
  onChangeTaskDesc(e) {
    this.setState({
      taskDesc: e.target.value,
    });
  }
  onChangeTaskDueDate(e) {
    this.setState({
      taskDueDate: e.target.value,
    });
  }
  getTasks() {
    axios.get('/api/tasksbyuser', {
      params: {
        userId: this.props.userId,
      },
    })
      .then(({ data }) => {
        this.setState({
          tasks: data,
        });
      })
      .catch(err => console.error(err));
  }
  deleteTask(taskId) {
    const tasks = this.state.tasks.filter(task => task.taskId !== taskId);
    this.setState({
      tasks,
    });
    axios.put('/api/task/delete', { taskId });
  }
  submit(e) {
    e.preventDefault();
    if (!this.state.taskDesc) {
      this.setState({
        errorMessage: 'Please enter task description',
      });
      return;
    }
    const newTask = {
      taskDesc: this.state.taskDesc,
      taskDueDate: this.state.taskDueDate,
      userId: this.props.userId,
    };

    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    }).then(res => res.json())
      .then((data) => {
        this.setState({
          taskDesc: '',
          taskDueDate: '',
          errorMessage: null,
        });
        this.getTasks();
      });
  }
  createTasks(task) {
    return (<TaskEntry
      key={task.taskId}
      task={task}
      deleteTask={this.deleteTask}
      savedJobs={this.props.savedJobs}
    />
    );
  }
  render() {
    const sortedByDate = [].concat(this.state.tasks).sort((a, b) => {
      return a.taskDueDate > b.taskDueDate;
    }).reverse().map(this.createTasks);
    return (
      <div className="container">
        <Card>
          <form className="task-form" onSubmit={this.submit}>
            <Input label="What needs to be done?" name="taskDesc" value={this.state.taskDesc} onChange={this.onChangeTaskDesc} />
            <Input label="Due Date" className="task-due-date" type="date" name="taskDueDate" value={this.state.taskDueDate} onChange={this.onChangeTaskDueDate} />
            <Button type="submit">Save</Button>
          </form>
          <Error error={this.state.errorMessage} />
        </Card>
        <div>
            {sortedByDate}
        </div>
      </div>
    );
  }
}

export default Tasks;
