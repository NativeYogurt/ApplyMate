import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';
import FontAwesome from 'react-fontawesome';

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
    let nextButton = <li className="next" onClick={this.handleNext}>Next Page
      <i className="fa fa-arrow-right" /></li>;

    if (page === pages) {
      nextButton = <li className="next disabled">Next Page
      <i className="fa fa-arrow-right" /></li>;

    let previousButton = <li className="previous" onClick={this.handlePrevious}><i className="fa fa-arrow-left" /> Previous Page</li>;

    if (page === 1) {
      previousButton = <li className="previous disabled">
      <i className="fa fa-arrow-left" /> Previous Page</li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}>Next Page
      <i className="fa fa-arrow-right" /></li>;

    if (page === pages) {
      nextButton = <li className="next disabled">Next Page
      <i className="fa fa-arrow-right" /></li>;
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
    return (
      <div>
        {resume ? <PDF
          file={resume}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
        /> : <div>Add your resume to compare your skills!</div>}
        {pagination}
      </div>
    );
  }
}

UploadedResume.propTypes = {
  userResume: PropTypes.string.isRequired,
};

export default UploadedResume;
