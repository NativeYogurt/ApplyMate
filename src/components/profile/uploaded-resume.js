import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';
import { ThreeBounce } from 'better-react-spinkit';
import { Button, Icon, Card } from 'react-materialize';

class UploadedResume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDocumentComplete = this.onDocumentComplete.bind(this);
    this.onPageComplete = this.onPageComplete.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  componentWillMount() {
    if (this.props.userResume) {
      this.props.toggleResume(false);
    }
  }

  onDocumentComplete(pages) {
    this.setState({ page: 1, pages });
  }

  onPageComplete(page) {
    this.setState({ page });
  }

  handlePrevious() {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext() {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination(page, pages) {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><Icon>keyboard_arrow_left</Icon></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><Icon>keyboard_arrow_left</Icon></li>;
    }

    let nextButton = <li className="next" onClick={this.handleNext}><Icon>keyboard_arrow_right</Icon></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><Icon>keyboard_arrow_right</Icon></li>;
    }
    return (
      <ul className="pager">
        <Button>{previousButton}</Button>
        <Button>{nextButton}</Button>
      </ul>
    );
  }

  render() {
    const resume = `${this.props.userResume}`;
    let pagination = null;
    if (this.state.pages > 1) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }

    let resumeElement = '';
    if (!resume && !this.props.resumeLoadToggle) {
      resumeElement = (<p>Upload your resume to compare job skills!</p>);
    } else if (!resume && this.props.resumeLoadToggle) {
      resumeElement = (<ThreeBounce
        size={15}
        color="#26a69a"
      />);
    } else {
      resumeElement = (
        <Card>
          <PDF
            file={resume}
            onDocumentComplete={this.onDocumentComplete}
            onPageComplete={this.onPageComplete}
            page={this.state.page}
          />
        </Card>
      );
    }
    return (
      <div>
        {resumeElement}
        {pagination}
      </div>
    );
  }
}

UploadedResume.propTypes = {
  userResume: PropTypes.string.isRequired,
  toggleResume: PropTypes.func.isRequired,
  resumeLoadToggle: PropTypes.bool.isRequired,
};

export default UploadedResume;
