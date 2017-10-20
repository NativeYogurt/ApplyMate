import React from 'react';
import PropTypes from 'prop-types';

import VideoList from './VideoList';
import TutorialList from './TutorialList';

function SkillEntry(props) {
  return (
    <tr className="skill-list-entry">
      <td className="skill"><h2>{props.skill}</h2></td>
      <td className="video"><VideoList skill={`${props.skill}programmingtutorial`} addResource={props.addResource} userId={props.userId} checkResource={props.checkResource} savedResources={props.savedResources} /></td>
      <td className="web"><TutorialList skill={`${props.skill}programmingtutorial`} addResource={props.addResource} userId={props.userId} checkResource={props.checkResource} savedResources={props.savedResources} /></td>
    </tr>
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