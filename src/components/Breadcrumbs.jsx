import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({ title, parent = null, parentUrl = null }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="bg-light border-bottom py-3 mb-4">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 small fw-semibold">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-muted">
                <i className="bi bi-house-door-fill me-1"></i> Home
              </Link>
            </li>
            {parent && parentUrl && (
              <li className="breadcrumb-item">
                <Link to={parentUrl} className="text-decoration-none text-muted">
                  {parent}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active text-primary fw-bold" aria-current="page">
              {title || (pathnames[pathnames.length - 1] ? pathnames[pathnames.length - 1].replace(/-/g, ' ') : 'Page')}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
