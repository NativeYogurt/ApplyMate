import React from 'react';

class TutorialListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="Tutorial-list-entry">
        <div>
          <div className="Tutorial-list-entry-title">
            {this.props.Tutorial.title}
          </div>
          <div className="Tutorial-list-entry-detail"><a href={this.props.Tutorial.link} target="_blank">{this.props.Tutorial.link}</a></div>
        </div>
      </div>
    );
  }
}
// onClick={() => this.props.handleTutorialListEntryTitleClick(Tutorial)}
export default TutorialListEntry;
