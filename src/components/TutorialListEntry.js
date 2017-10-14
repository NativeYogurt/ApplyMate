import React from 'react';
import PropTypes from 'prop-types';

function TutorialListEntry(props) {
  return (
    <div className="Tutorial-list-entry">
      <div>
        <div className="Tutorial-list-entry-title">
          {props.tutorial.title}
        </div>
        <div className="Tutorial-list-entry-detail"><a href={props.tutorial.link} target="_blank">{props.tutorial.link}</a></div>
      </div>
    </div>
  );
}
TutorialListEntry.propTypes = {
  tutorial: PropTypes.object.isRequired,
};
export default TutorialListEntry;
