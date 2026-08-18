import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onApply }) => {
  return (
    <div className="card-hover-lift h-100 p-4 d-flex flex-column justify-content-between position-relative">
      {job.isFeatured && (
        <span className="position-absolute top-0 end-0 m-3 badge bg-primary text-white rounded-pill px-3 py-2 small shadow-sm">
          <i className="bi bi-star-fill me-1"></i> Featured
        </span>
      )}

      <div>
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="rounded-3 bg-light p-2 border border-light-subtle d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }}>
            {job.companyImage ? (
              <img src={job.companyImage} alt={job.companyName} className="img-fluid rounded" style={{ maxHeight: '40px', objectFit: 'contain' }} />
            ) : (
              <i className="bi bi-building fs-3 text-primary"></i>
            )}
          </div>
          <div>
            <span className="badge bg-navy-gradient text-white rounded-pill px-2 py-1 fs-7 mb-1 d-inline-block">
              {job.category}
            </span>
            <h5 className="fw-bold mb-0 text-navy text-truncate" style={{ maxWidth: '240px' }} title={job.jobTitle}>
              {job.jobTitle}
            </h5>
            <small className="text-muted fw-medium">{job.companyName}</small>
          </div>
        </div>

        <p className="text-muted small leading-relaxed line-clamp-2 mb-3">
          {job.description}
        </p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <span className="badge bg-light text-dark border px-2 py-1 font-monospace small fw-normal">
            <i className="bi bi-geo-alt-fill text-danger me-1"></i> {job.location}
          </span>
          <span className="badge bg-light text-dark border px-2 py-1 font-monospace small fw-normal">
            <i className="bi bi-clock-fill text-info me-1"></i> {job.employmentType}
          </span>
          <span className="badge bg-light text-dark border px-2 py-1 font-monospace small fw-normal">
            <i className="bi bi-briefcase-fill text-primary me-1"></i> {job.experience}
          </span>
          <span className="badge bg-light text-dark border px-2 py-1 font-monospace small fw-normal">
            <i className="bi bi-people-fill text-success me-1"></i> {job.vacancies} Vacancies
          </span>
        </div>
      </div>

      <div className="pt-3 border-top d-flex align-items-center justify-content-between">
        <div>
          <small className="text-muted d-block fs-7">Offered Compensation</small>
          <span className="fw-bold text-primary fs-6">{job.salary}</span>
        </div>

        <div className="d-flex gap-2">
          <Link to={`/careers/${job._id}`} className="btn btn-outline-custom btn-sm rounded-pill">
            Details
          </Link>
          <button onClick={() => onApply(job)} className="btn btn-primary-custom btn-sm rounded-pill">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
