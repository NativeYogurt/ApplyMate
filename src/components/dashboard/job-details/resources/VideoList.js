import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import VideoListEntry from './VideoListEntry';

const VideoList = (props) => {
  return (
    <div className="video-list">
      {props.videos ? props.videos.map(video =>
        (<VideoListEntry
          key={video.etag}
          video={video}
          addResource={props.addResource}
          skill={props.skill}
          userId={props.userId}
          checkResource={props.checkResource}
          savedResources={props.savedResources}
        />)) : null}
    </div>
  );
};

export default VideoList;
