import React from 'react';
import PropTypes from 'prop-types';

function VideoListEntry(props) {
  return (
    <div className="video-list-entry">
      <div>
        <img className="media-object" src={props.video.snippet.thumbnails.default.url} alt="" />
      </div>
      <div className="media-body">
        <div
          className="video-list-entry-title"
          onClick={()=> {
            window.open(`https://www.youtube.com/embed/${props.video.id.videoId}`, "_blank")}}
        >
          {props.video.snippet.title}
        </div>
        <div className="video-list-entry-detail">{props.video.snippet.description}</div>
      </div>
    </div>
  );
}
VideoListEntry.propTypes = {
  video: PropTypes.object.isRequired,
};
export default VideoListEntry;