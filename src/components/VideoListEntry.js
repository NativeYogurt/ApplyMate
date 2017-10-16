import React from 'react';
import PropTypes from 'prop-types';

class VideoListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.checkResource(this.props.video.id.videoId, this.props.savedResources)) {
      this.setState({
        added: true,
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const newResource = {
      relatedSkill: this.props.skill,
      tutorialType: 'video',
      tutorialLink: this.props.video.id.videoId,
      tutorialTitle: this.props.video.snippet.title,
      videoThumbnail: this.props.video.snippet.thumbnails.default.url,
      videoDescription: this.props.video.snippet.description,
      userId: this.props.userId,
    };
    this.props.addResource(newResource);
    this.setState({
      added: true,
    });
  }
  render() {
    return (
      <div className="video-list-entry">
        <div>
          <img className="media-object" src={this.props.video.snippet.thumbnails.default.url} alt="" />
        </div>
        <div className="media-body">
          <div
            className="video-list-entry-title"
            onClick={()=> {
              window.open(`https://www.youtube.com/embed/${this.props.video.id.videoId}`, "_blank")}}
          >
            {this.props.video.snippet.title}
          </div>
          <div className="video-list-entry-detail">{this.props.video.snippet.description}</div>
        </div>
        <button onClick={this.handleSubmit} disabled={this.state.added}>Add</button>
      </div>
    );
  }
}
VideoListEntry.propTypes = {
  video: PropTypes.object.isRequired,
  checkResource: PropTypes.func.isRequired,
  savedResources: PropTypes.array.isRequired,
  skill: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  addResource: PropTypes.func.isRequired,
};
export default VideoListEntry;
