import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PDF from 'react-pdf-js';


const UploadedResume = (props) => {
  const resume = `${props.userResume}`;
  return (
    <div>
      {resume ? <PDF file={resume} /> : <div>Add your resume to compare your skills!</div>}
    </div>
  );
};

UploadedResume.propTypes = {
  userResume: PropTypes.string.isRequired,
};

export default UploadedResume;
