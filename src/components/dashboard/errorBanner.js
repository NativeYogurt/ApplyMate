import React from 'react';

const ErrorBanner = (props) => {
  let message = <div />;
  if (props.error) {
    message = <div className="error">{props.error}</div>;
  }

  return (
    message
  );
};


export default ErrorBanner;
