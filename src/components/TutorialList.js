import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import TutorialListEntry from './TutorialListEntry';

class TutorialList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: [],
    };
    this.getTutorials = this.getTutorials.bind(this);
  }
  componentDidMount() {
    this.getTutorials(this.props.skill);
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
      <div className="Tutorial-list">
        <h3>Tutorial Sites</h3>
        {this.state.tutorials ? this.state.tutorials.map(tutorial =>
          (<TutorialListEntry
            key={tutorial.title}
            tutorial={tutorial}
            addResource={this.props.addResource}
            skill={this.props.skill}
            userId={this.props.userId}
            checkResource={this.props.checkResource}
            savedResources={this.props.savedResources}
          />)) : null }
      </div>
    );
  }
}
TutorialList.propTypes = {
  skill: PropTypes.string.isRequired,
  addResource: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  checkResource: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
};
export default TutorialList;
