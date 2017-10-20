import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ThreeBounce } from 'better-react-spinkit';
import UploadedResume from './UploadedResume';

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.readPDF = this.readPDF.bind(this);
  }
  readPDF(event) {
    this.props.clearResume();
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
  render() {
    return (
      <div>
        <h2>Upload Resume:</h2>
        <input type="file" name="resume" accept="application/pdf" onChange={this.readPDF} />
        <br /><br />
        <hr />
        <h2>My Resume:</h2>
        <UploadedResume userResume={this.props.userResume} />
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
