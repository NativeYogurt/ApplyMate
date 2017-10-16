import React from 'react';
import PropTypes from 'prop-types';

import VideoList from './VideoList';
import TutorialList from './TutorialList';

function SkillEntry(props) {
  return (
    <div className="skill-list-entry">
      <h2>{props.skill}</h2>
      <VideoList skill={`${props.skill}tutorial`} addResource={props.addResource} userId={props.userId} />
      <TutorialList skill={`${props.skill}+tutorial`} addResource={props.addResource} userId={props.userId} />
    </div>
  );
}
SkillEntry.propTypes = {
  skill: PropTypes.string.isRequired,
  addResource: PropTypes.func.isRequired,
};
export default SkillEntry;
