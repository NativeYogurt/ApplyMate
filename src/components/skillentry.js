import React from 'react';
import $ from 'jquery';
import VideoList from './VideoList.js';
import TutorialList from './TutorialList.js';

class SkillEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="skill-list-entry">
        <h2>{this.props.skill}</h2>
        <VideoList skill={this.props.skill + 'tutorial'} />
        <TutorialList skill={this.props.skill + '+tutorial'} />
      </div>
    );
  }
}

export default SkillEntry;
