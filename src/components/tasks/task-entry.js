import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-materialize';

class TaskEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      jobTitle: '',
    };
    this.getJobInfo = this.getJobInfo.bind(this);
  }
  componentDidMount() {
      this.getJobInfo(this.props.task.jobId);
  }
  getJobInfo(jobId) {
    const currentJob = this.props.savedJobs.filter(job => {
      return job.jobId === jobId;
    })[0];
    if (currentJob) {
      this.setState({
        company: currentJob.company,
        jobTitle: currentJob.jobTitle,
      });
    }
  }
  render() {
    return (
      <Card>
        {this.state.company ?
          (<div>{this.state.company}|{this.state.jobTitle}</div>) :
        null}
        <div>{this.props.task.taskDesc}</div>
        <div>Due: {this.props.task.taskDueDate}</div>
        <Button icon="delete" onClick={() => this.props.deleteTask(this.props.task.taskId)} />
      </Card>
    );
  }
}

export default TaskEntry;
