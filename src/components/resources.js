import React from 'react';
import axios from 'axios';

import SkillEntry from './skillentry';

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      userSkills: [],
      missingSkills: [],
    };
  }
  componentWillMount() {
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
        if (jobs) {
          missing = jobs[0].missingSkills;
        }
        this.setState({
          jobs,
          userSkills,
          missingSkills: missing,
        });
        // console.log('jobs skills', this.state.jobs);
        // console.log('user skills', this.state.userSkills);
        // console.log('missing skills', this.state.missingSkills);
      });
  }

  render() {
    const hasMissingSkills = (
      <div className="alert">
        You are missing the following skills required by the job.
      </div>
    );
    const noMissingSkills = (
      <div className="alert">
        You have all the skills required by the job.
      </div>
    );
    return (
      <div>
        {this.state.missingSkills.length ? hasMissingSkills : noMissingSkills}
        <div className="skill-list">
          {this.state.missingSkills.map(skill =>
            (<SkillEntry
              key={skill}
              skill={skill}
            />))}
        </div>
      </div>
    );
  }
}

export default Resources;
