import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import TutorialListEntry from './TutorialListEntry';

const TutorialList = (props) => {
  return (
    <div className="Tutorial-list">
      {props.tutorials ? props.tutorials.map(tutorial =>
        (<TutorialListEntry
          key={tutorial.link}
          tutorial={tutorial}
          addResource={props.addResource}
          skill={props.skill}
          userId={props.userId}
          checkResource={props.checkResource}
          savedResources={props.savedResources}
        />)) : null }
    </div>
  );
};

export default TutorialList;
