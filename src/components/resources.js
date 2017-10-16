import React from 'react';
import axios from 'axios';

import SkillEntry from './skillentry';

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.addResource = this.addResource.bind(this);
  }

  addResource(resource) {
    fetch('/api/resource', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource)
    }).then(res => res.json())
      .then((data) => {
        console.log('post resource', data);
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
        {this.props.missingSkills.length ? hasMissingSkills : noMissingSkills}
        <div className="skill-list">
          {this.props.missingSkills.map(skill =>
            (<SkillEntry
              key={skill}
              skill={skill}
              addResource={this.addResource}
              userId={this.props.userId}
            />))}
        </div>
      </div>
    );
  }
}

export default Resources;
