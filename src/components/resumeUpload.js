import React from 'react';
import PropTypes from 'prop-types';

const Resume = props => (
  <input type="file" name="resume" accept="application/pdf" onChange={props.readPDF} />
);

Resume.propTypes = {
  readPDF: PropTypes.func.isRequired,
};

export default Resume;
