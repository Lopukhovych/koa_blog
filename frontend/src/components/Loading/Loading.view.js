import React from 'react';

const LoadingView = () => (
  <div className="d-flex justify-content-center align-items-center col-12 mt-3 h-25">
    <div className="spinner-border" role="status" aria-hidden="true" />
    <strong className="ml-3">Loading...</strong>
  </div>
);

export default LoadingView;
