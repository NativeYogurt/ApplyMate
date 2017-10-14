import React from 'react';
import PropTypes from 'prop-types';

import VideoList from './VideoList';
import TutorialList from './TutorialList';

function SkillEntry(props) {
  return (
    <div className="skill-list-entry">
      <h2>{props.skill}</h2>
      <VideoList skill={`${props.skill}tutorial`} />
      <TutorialList skill={`${props.skill}+tutorial`} />
    </div>
  );
}
SkillEntry.propTypes = {
  skill: PropTypes.string.isRequired,
};
export default SkillEntry;
