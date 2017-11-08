import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Button, Input, Card, Table } from 'react-materialize';

import SkillEntry from './skillentry';

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSkills: [],
      missingSkills: [],
      savedResources: [],
    };
    this.addResource = this.addResource.bind(this);
    this.getResources = this.getResources.bind(this);
    this.checkResource = this.checkResource.bind(this);
    this.getJobComparison = this.getJobComparison.bind(this);
  }
  componentDidMount() {
    this.getJobComparison(this.props.jobId);
    this.getResources();
  }
  getJobComparison(jobId) {
    axios.get('/api/comparison', {
      params: {
        userId: this.props.userId,
      },
    })
      .then((result) => {
        let missing = [];
        const { data } = result;
        const { userSkills, jobs } = data;
        jobs.map((job) => {
          job.missingSkills = job.skills.filter(skill => userSkills.indexOf(skill) === -1);
          return job;
        });
        const currentJob = jobs.filter(job => { return jobId === job.jobId; });
        if (currentJob.length > 0) {
          missing = currentJob[0].missingSkills.slice(0, 3);
        } else if (jobs.length > 0) {
          missing = jobs[jobs.length - 1].missingSkills.slice(0, 3);
        } else {
          missing = [];
        }
        // if (jobs[0]) {
        //   missing = jobs[0].missingSkills;
        // }
        this.setState({
          userSkills,
          missingSkills: missing,
        });
      });
  }
  getResources() {
    axios.get('/api/resource', {
      params: {
        userId: this.props.userId,
      },
    })
      .then(resources => {
        // console.log('saved resource', resources.data);
        this.setState({
          savedResources: resources.data,
          // missingSkills: this.props.missingSkills,
        });
      })
      .catch(err => console.error(err));
  }
  addResource(resource) {
    fetch('/api/resource', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    }).then(res => res.json())
      .then((data) => {
        const newResource = data;
        const savedResources = this.state.savedResources.concat(newResource);
        this.setState({ savedResources });
      });
  }
  checkResource(resourceLink, savedResources) {
    if (savedResources) {
      for (let i = 0; i < savedResources.length; i += 1) {
        if (savedResources[i].tutorialLink === resourceLink) {
          return true;
          break;
        }
      }
    }
    return false;
  }
  render() {
    const hasMissingSkills = (
      <div className="error">
        You are missing the following skills required by the job.
      </div>
    );
    const noMissingSkills = (
      <div className="alert">
        You have all the skills required by the job.
      </div>
    );

    // console.log('missing skills', this.props.missingSkills);
    return (
      <div>
        {this.state.missingSkills.length > 0 ? hasMissingSkills : noMissingSkills}
        {this.state.missingSkills.length > 0 ? (
          <div className="resource-list">
            <table className="bordered">
              <thead>
                <tr>
                  <th className="video">Tutorials</th>
                </tr>
              </thead>
              <tbody>
                {this.state.missingSkills.map(skill =>
                  (<SkillEntry
                    key={skill}
                    skill={skill}
                    addResource={this.addResource}
                    userId={this.props.userId}
                    savedResources={this.state.savedResources}
                    checkResource={this.checkResource}
                  />))}
              </tbody>
            </table>
          </div>
        ) : null }
      </div>
    );
  }
}
// <th className="web">Online Resources</th>

Resources.propTypes = {
  userId: PropTypes.string.isRequired,
  missingSkills: PropTypes.array.isRequired,
};
export default Resources;
