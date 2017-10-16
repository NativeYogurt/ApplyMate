import React from 'react';
import PropTypes from 'prop-types';

import VideoList from './VideoList';
import TutorialList from './TutorialList';

function SkillEntry(props) {
  return (
    <div className="skill-list-entry">
      <h2>{props.skill}</h2>
      <VideoList skill={`${props.skill}tutorial`} addResource={props.addResource} userId={props.userId} checkResource={props.checkResource} savedResources={props.savedResources} />
      <TutorialList skill={`${props.skill}+tutorial`} addResource={props.addResource} userId={props.userId} checkResource={props.checkResource} savedResources={props.savedResources} />
    </div>
  );
}
SkillEntry.propTypes = {
  skill: PropTypes.string.isRequired,
  addResource: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  checkResource: PropTypes.func.isRequired,
  savedResources: PropTypes.array.isRequired,
};
export default SkillEntry;
