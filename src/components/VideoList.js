import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import VideoListEntry from './VideoListEntry';

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      currentVideo: null,
    };
    this.getYouTubeVideos = this.getYouTubeVideos.bind(this);
  }
  componentDidMount() {
    this.getYouTubeVideos(this.props.skill);
    console.log('componentDidMount', this.state.currentVideo);
  }
  getYouTubeVideos(query) {
    $.get('https://www.googleapis.com/youtube/v3/search', {
      part: 'snippet',
      key: process.env.REACT_APP_YOUTUBE_KEY,
      q: query,
      maxResults: 3,
      type: 'video',
      // videoEmbeddable: 'true',
      order: 'viewCount',
    })
      .done(({ items }) => {
        this.setState({
          videos: items,
          currentVideo: items[0],
        });
      })
      .fail(({ responseJSON }) => {
        responseJSON.error.errors.forEach(err =>
          console.error(err));
      });
  }
  render() {
    return (
      <div className="video-list">
        {this.state.videos.map(video =>
          (<VideoListEntry
            key={video.etag}
            video={video}
            addResource={this.props.addResource}
            skill={this.props.skill}
            userId={this.props.userId}
            checkResource={this.props.checkResource}
            savedResources={this.props.savedResources}
          />))}
      </div>
    );
  }
}
VideoList.propTypes = {
  skill: PropTypes.string.isRequired,
  addResource: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  checkResource: PropTypes.func.isRequired,
  savedResources: PropTypes.array.isRequired,
};
export default VideoList;
