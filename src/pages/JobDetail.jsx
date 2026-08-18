import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import ApplyModal from '../components/ApplyModal';
import Loader from '../components/Loader';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/jobs/${id}`);
        if (res.data.success) {
          setJob(res.data.job);
        }
      } catch (err) {
        setError('Job opening specifications could not be found.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <div className="pt-5"><Loader /></div>;
  if (error || !job) {
    return (
      <div className="container text-center py-5 my-5">
        <h3 className="text-navy font-bold">Job Post Not Found</h3>
        <p className="text-muted mb-4">{error || 'This vacancy may have expired or been closed.'}</p>
        <Link to="/careers" className="btn btn-primary-custom rounded-pill">Back to Job Listings</Link>
      </div>
    );
  }

  return (
    <div className="job-detail-page pt-navbar">
      <Breadcrumbs title={job.jobTitle} parent="Careers" parentUrl="/careers" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded-3 bg-light p-2 border d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                  {job.companyImage ? (
                    <img src={job.companyImage} alt={job.companyName} className="img-fluid rounded" style={{ maxHeight: '48px', objectFit: 'contain' }} />
                  ) : (
                    <i className="bi bi-building fs-2 text-primary"></i>
                  )}
                </div>
                <div>
                  <span className="badge bg-navy-gradient text-white rounded-pill px-3 py-1 mb-1 d-inline-block">
                    {job.category}
                  </span>
                  <h1 className="display-6 fw-extrabold text-navy mb-0">{job.jobTitle}</h1>
                  <small className="text-muted fw-semibold">{job.companyName} &bull; {job.department}</small>
                </div>
              </div>

              <div className="p-4 rounded-4 bg-light mb-4 border">
                <div className="row g-3">
                  <div className="col-sm-3 col-6">
                    <small className="text-muted d-block">Location</small>
                    <strong className="text-dark"><i className="bi bi-geo-alt-fill text-danger me-1"></i> {job.location}</strong>
                  </div>
                  <div className="col-sm-3 col-6">
                    <small className="text-muted d-block">Compensation</small>
                    <strong className="text-primary">{job.salary}</strong>
                  </div>
                  <div className="col-sm-3 col-6">
                    <small className="text-muted d-block">Employment Type</small>
                    <strong className="text-dark">{job.employmentType}</strong>
                  </div>
                  <div className="col-sm-3 col-6">
                    <small className="text-muted d-block">Open Vacancies</small>
                    <strong className="text-success">{job.vacancies} Positions</strong>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="fw-bold text-navy mb-3">Job Description</h4>
                <p className="text-muted leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="mb-5">
                  <h4 className="fw-bold text-navy mb-3">Key Responsibilities</h4>
                  <ul className="list-unstyled text-muted d-flex flex-column gap-2">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-primary mt-1"></i>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <div className="mb-5">
                  <h4 className="fw-bold text-navy mb-3">Perks & Compensation Benefits</h4>
                  <div className="row g-3">
                    {job.benefits.map((ben, i) => (
                      <div key={i} className="col-md-6 d-flex align-items-center gap-2">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span className="fw-semibold text-dark">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {job.skills && job.skills.length > 0 && (
                <div className="mb-5">
                  <h4 className="fw-bold text-navy mb-3">Required Competencies & Skills</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="badge bg-light text-dark border px-3 py-2 rounded-pill font-monospace fs-7">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-4">
              <div className="card-hover-lift p-4 rounded-4 bg-light border position-sticky" style={{ top: '100px' }}>
                <h4 className="fw-bold text-navy mb-3">Job Overview</h4>

                <div className="d-flex flex-column gap-3 mb-4 small border-bottom pb-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Qualification Mandate:</span>
                    <strong className="text-dark text-end ms-2">{job.qualification}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Required Experience:</span>
                    <strong className="text-dark">{job.experience}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Gender Preference:</span>
                    <strong className="text-dark">{job.genderPreference}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Age Bracket:</span>
                    <strong className="text-dark">{job.ageLimit}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Working Schedule:</span>
                    <strong className="text-dark">{job.workingHours}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Posted Date:</span>
                    <strong className="text-dark">{new Date(job.publishedDate || job.createdAt).toLocaleDateString()}</strong>
                  </div>
                </div>

                <button onClick={() => setShowApplyModal(true)} className="btn btn-primary-custom w-100 rounded-pill py-3 fw-bold">
                  <i className="bi bi-send-fill me-2"></i> Apply For This Role
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showApplyModal && (
        <ApplyModal job={job} onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
};

export default JobDetail;
