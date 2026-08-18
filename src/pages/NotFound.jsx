import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light text-center py-5">
      <div className="container">
        <h1 className="display-1 fw-extrabold text-primary mb-0">404</h1>
        <h3 className="fw-bold text-navy mb-3">Page Not Found</h3>
        <p className="text-muted max-w-md mx-auto mb-4">
          The page or resource you are looking for has been moved, renamed, or does not exist.
        </p>
        <Link to="/" className="btn btn-primary-custom rounded-pill px-4">
          Return To Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
