import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import VideoList from './VideoList';
import TutorialList from './TutorialList';

class SkillEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      tutorials: [],
    };
    this.getYouTubeVideos = this.getYouTubeVideos.bind(this);
    this.getTutorials = this.getTutorials.bind(this);
  }
  componentWillMount() {
    if (this.props.skill) {
      this.getYouTubeVideos(`${this.props.skill}+programming+tutorial`);
      this.getTutorials(`${this.props.skill}+programming+tutorial`);
    }
  }
  getYouTubeVideos(query) {
    $.get('https://www.googleapis.com/youtube/v3/search', {
      part: 'snippet',
      key: process.env.REACT_APP_YOUTUBE_KEY,
      q: query,
      maxResults: 3,
      type: 'video',
      videoEmbeddable: 'true',
      order: 'viewCount',
    })
      .done(({ items }) => {
        this.setState({
          videos: items,
        });
      })
      .fail(({ responseJSON }) => {
        responseJSON.error.errors.forEach(err =>
          console.error(err));
      });
  }
  getTutorials(query) {
    $.get('https://www.googleapis.com/customsearch/v1?parameters', {
      cx: process.env.REACT_APP_GOOGLE_CX,
      key: process.env.REACT_APP_GOOGLE_KEY,
      q: query,
      num: 3,
    })
      .done(({ items }) => {
        this.setState({
          tutorials: items,
        });
      })
      .fail(({ responseJSON }) => {
        responseJSON.error.errors.forEach(err =>
          console.error(err));
      });
  }
  render() {
    return (
      <div>
      <tr>
        <th id="skill-header"><h2>{this.props.skill}</h2></th>
      </tr>
      <tr className="skill-list-entry">
        <td className="video">
          <VideoList
            videos={this.state.videos}
            skill={this.props.skill}
            addResource={this.props.addResource}
            userId={this.props.userId}
            checkResource={this.props.checkResource}
            savedResources={this.props.savedResources}
          />
          <TutorialList
            tutorials={this.state.tutorials}
            skill={this.props.skill}
            addResource={this.props.addResource}
            userId={this.props.userId}
            checkResource={this.props.checkResource}
            savedResources={this.props.savedResources}
          />
        </td>
      </tr>
      <hr />
      </div>
    );
  }
}
SkillEntry.propTypes = {
  skill: PropTypes.string.isRequired,
  addResource: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  checkResource: PropTypes.func.isRequired,
  savedResources: PropTypes.array.isRequired,
};
export default SkillEntry;
