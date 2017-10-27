import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Card, Button, Input } from 'react-materialize';

import ProfileNav from './profile-nav';
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
      <div className="container">
        <Card>
          <ProfileNav />
          <h5>Upload Resume:</h5>
          <form action="#">
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file" name="resume" accept="application/pdf" onChange={this.readPDF} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </form>
          <h5>My Resume:</h5>
          <UploadedResume
            userResume={this.props.userResume}
            resumeLoadToggle={this.state.resumeLoadToggle}
            toggleResume={this.toggleResume}
          />
        </Card>
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
