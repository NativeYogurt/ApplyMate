import React from 'react';
import SkillEntry from './skillentry.js';

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      missingSkills: ['javascript', 'react'],
    };
  }
  render() {
    return (
      <div className="skill-list">
        {this.state.missingSkills.map(skill =>
          (<SkillEntry
            key={skill}
            skill={skill}
          />))}
      </div>
    );
  }
}

export default Resources;
