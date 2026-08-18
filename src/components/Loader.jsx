import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted small fw-semibold mt-3 tracking-wider text-uppercase">Loading Premium Experience...</p>
    </div>
  );
};

export default Loader;
