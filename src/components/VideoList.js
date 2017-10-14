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
    this.handleVideoListEntryTitleClick = this.handleVideoListEntryTitleClick.bind(this);
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
  handleVideoListEntryTitleClick(video) {
    this.setState({
      currentVideo: video,
    });
  }
  render() {
    return (
      <div className="video-list">
        <h3>Video Tutorial</h3>
        {this.state.videos.map(video =>
          (<VideoListEntry
            key={video.etag}
            video={video}
            handleVideoListEntryTitleClick={this.handleVideoListEntryTitleClick}
          />))}
      </div>
    );
  }
}
VideoList.propTypes = {
  skill: PropTypes.string.isRequired,
};
export default VideoList;
