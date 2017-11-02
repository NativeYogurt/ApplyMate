import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-materialize';

const SavedResources = (props) => {
  const tutorial = (
    <div className="Tutorial-list-entry">
      <h4>Related Skill: {props.resource.relatedSkill}</h4>
      <div>
        <div className="Tutorial-list-entry-title">
          {props.resource.tutorialTitle}
        </div>
        <div className="Tutorial-list-entry-detail">
          <a href={props.resource.tutorialLink} target="_blank">{props.resource.tutorialLink}</a>
        </div>
      </div>
    </div>
  );
  const video = (
    <div className="video-list-entry">
      <h5>Related Skill: {props.resource.relatedSkill}</h5>
      <div>
        <img className="media-object" src={props.resource.videoThumbnail} alt="" />
      </div>
      <div className="media-body">
        <a
          href="#"
          className="video-list-entry-title"
          onClick={() => {
            window.open(`https://www.youtube.com/embed/${props.resource.tutorialLink}`, '_blank');
          }}
        >
          {props.resource.tutorialTitle}
        </a>
        <div className="video-list-entry-detail">{props.resource.videoDescription}</div>
      </div>
    </div>
  );
  return (
    <Card>
      { props.resource.tutorialType === 'link' ? tutorial : video }
      <Button
        icon="delete"
        className="delete icon-button"
        onClick={() => props.deleteResource(props.resource.resourceId)}
      />
    </Card>
  );
};

SavedResources.propTypes = {
  resource: PropTypes.object.isRequired,
  deleteResource: PropTypes.func.isRequired,
};

export default SavedResources;
