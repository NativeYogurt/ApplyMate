import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.readPDF = this.readPDF.bind(this);
  }
  readPDF(event) {
    const reader = new FileReader();
    console.log(this);
    reader.onload = () => {
      const { result } = reader;
      axios.post('/api/resume', {
        result,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  render() {
    return (
      <input type="file" name="resume" accept="application/pdf" onChange={this.readPDF} />
    );
  }
}

Resume.propTypes = {
  readPDF: PropTypes.func.isRequired,
};

export default Resume;
