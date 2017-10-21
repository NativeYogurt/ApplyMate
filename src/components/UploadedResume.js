import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';
import FontAwesome from 'react-fontawesome';
import { ThreeBounce } from 'better-react-spinkit';


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
    let previousButton = <li className="previous" onClick={this.handlePrevious}>
      <i className="fa fa-arrow-left" /> Previous Page</li>;

    if (page === 1) {
      previousButton = <li className="previous disabled">
      <i className="fa fa-arrow-left" /> Previous Page</li>;
    }

    let nextButton = <li className="next" onClick={this.handleNext}>
      <i className="fa fa-arrow-right" />Next Page</li>;

    if (page === pages) {
      nextButton = <li className="next disabled">
      <i className="fa fa-arrow-right" />Next Page</li>;
    }
    return (
      <nav>
        <ul className="pager">
          <button>{previousButton}</button>
          <button>{nextButton}</button>
        </ul>
      </nav>
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
      resumeElement = (<h5>Please upload resume</h5>);
    } else if (!resume && this.props.resumeLoadToggle) {
      resumeElement = (<ThreeBounce
        size={15}
        color="blue"
      />);
    } else {
      resumeElement = (<PDF
        file={resume}
        onDocumentComplete={this.onDocumentComplete}
        onPageComplete={this.onPageComplete}
        page={this.state.page}
      />);
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
