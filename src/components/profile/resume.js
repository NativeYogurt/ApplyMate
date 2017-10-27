import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import UploadedResume from './uploaded-resume';

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeLoadToggle: false,
    };
    this.readPDF = this.readPDF.bind(this);
    this.toggleResume = this.toggleResume.bind(this);
  }

  readPDF(event) {
    this.props.clearResume();
    this.toggleResume(true);
    const reader = new FileReader();
    reader.onload = () => {
      const { result } = reader;
      axios.post('/api/resume', {
        result,
        userId: this.props.userId,
      })
        .then(data => {
          this.props.getJobComparison();
          this.props.getUserInfo();
        });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  toggleResume(bool) {
    this.setState({ resumeLoadToggle: bool });
  }

  render() {
    return (
      <div>
        <h5>Upload Resume:</h5>
        <input type="file" name="resume" accept="application/pdf" onChange={this.readPDF} />
        <br /><br />
        <h5>My Resume:</h5>
        <UploadedResume
          userResume={this.props.userResume}
          resumeLoadToggle={this.state.resumeLoadToggle}
          toggleResume={this.toggleResume}
        />
      </div>
    );
  }
}

Resume.propTypes = {
  userId: PropTypes.string.isRequired,
  userResume: PropTypes.string.isRequired,
  getJobComparison: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  clearResume: PropTypes.func.isRequired,
};

export default Resume;
