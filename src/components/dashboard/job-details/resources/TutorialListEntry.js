import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Button, Input, Card, Table } from 'react-materialize';

class TutorialListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.checkResource(this.props.tutorial.link, this.props.savedResources)) {
      this.setState({
        added: true,
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const newResource = {
      relatedSkill: this.props.skill,
      tutorialType: 'link',
      tutorialTitle: this.props.tutorial.title,
      tutorialLink: this.props.tutorial.link,
      userId: this.props.userId,
    };
    this.props.addResource(newResource);
    this.setState({
      added: true,
    });
  }
  render() {
    return (
      <div className="Tutorial-list-entry">
        <Row>
          <Col s={10}>
            <div className="Tutorial-list-entry-title">
              {this.props.tutorial.title}
            </div>
            <div className="Tutorial-list-entry-detail">
              <a href={this.props.tutorial.link} target="_blank">{this.props.tutorial.link}</a>
            </div>
          </Col>
          <Col s={2}>
            <Button onClick={this.handleSubmit} disabled={this.state.added}>Add</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
TutorialListEntry.propTypes = {
  skill: PropTypes.string.isRequired,
  tutorial: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  addResource: PropTypes.func.isRequired,
  checkResource: PropTypes.func.isRequired,
  savedResources: PropTypes.array.isRequired,
};
export default TutorialListEntry;
