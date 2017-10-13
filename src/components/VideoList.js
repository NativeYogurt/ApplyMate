import React from 'react';
import $ from 'jquery';
import VideoListEntry from './VideoListEntry.js';

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
    console.log(process.env.REACT_APP_YOUTUBE_KEY);
    var options = {
      query: query
    };
    console.log('query', query);
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
        console.log('items', items);
        this.setState({
          videos: items,
          currentVideo: items[0],
        });
        console.log('state', this.state.currentVideo);
      })
      .fail(({ responseJSON }) => {
        responseJSON.error.errors.forEach(err =>
          console.error(err));
      });
  }
  handleVideoListEntryTitleClick(video) {
    this.setState({
      currentVideo: video
    });
  }
  render() {
    return (
      <div className="video-list">
        <h3>Video Tutorial</h3>
        {this.state.videos.map((video) =>
          <VideoListEntry
            key={video.etag}
            video={video}
            handleVideoListEntryTitleClick={this.handleVideoListEntryTitleClick}
          />
        )}
      </div>
    );
  }
}

export default VideoList;
