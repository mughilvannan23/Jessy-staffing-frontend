import React, { useState } from 'react';
import API from '../services/api';

const ApplyModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    qualification: '',
    experience: '',
    expectedSalary: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!job) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!resumeFile) {
      setError('Please attach your Resume / CV file (PDF or DOC).');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('jobId', job._id);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('qualification', formData.qualification);
      data.append('experience', formData.experience);
      data.append('expectedSalary', formData.expectedSalary);
      data.append('coverLetter', formData.coverLetter);

      data.append('resume', resumeFile);
      if (photoFile) {
        data.append('photo', photoFile);
      }

      const res = await API.post('/applications', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        setSuccess('Application submitted successfully! Our HR recruitment team will review your CV.');
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block bg-dark bg-opacity-50" tabIndex="-1" style={{ backdropFilter: 'blur(8px)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          <div className="modal-header bg-navy-gradient text-white p-4">
            <div>
              <span className="badge bg-info text-white rounded-pill px-3 py-1 mb-1">Applying For</span>
              <h5 className="modal-title fw-bold text-white mb-0">{job.jobTitle}</h5>
              <small className="text-light opacity-75">{job.companyName} &bull; {job.location}</small>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            {error && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                <i className="bi bi-exclamation-triangle-fill me-1"></i> {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success py-2 px-3 small rounded-3 mb-3">
                <i className="bi bi-check-circle-fill me-1"></i> {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-3"
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-3"
                    placeholder="eleanor@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control rounded-3"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Current Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control rounded-3"
                    placeholder="City, State, Country"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Highest Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    className="form-control rounded-3"
                    placeholder="e.g. Master in Science / RN License"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Total Relevant Experience *</label>
                  <input
                    type="text"
                    name="experience"
                    className="form-control rounded-3"
                    placeholder="e.g. 4 Years"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Expected Salary</label>
                  <input
                    type="text"
                    name="expectedSalary"
                    className="form-control rounded-3"
                    placeholder="e.g. $70,000 / Year"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Candidate Photo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control rounded-3"
                    onChange={(e) => setPhotoFile(e.target.files[0])}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small text-muted">Upload Resume / CV (PDF / DOC) *</label>
                  <div className="p-3 border rounded-3 bg-light text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      id="resumeUploadInput"
                      className="d-none"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                    />
                    <label htmlFor="resumeUploadInput" className="cursor-pointer mb-0">
                      <i className="bi bi-cloud-arrow-up-fill fs-2 text-primary d-block mb-1"></i>
                      <span className="fw-semibold text-primary d-block">
                        {resumeFile ? resumeFile.name : 'Click to Browse & Upload Resume'}
                      </span>
                      <small className="text-muted d-block fs-7">Accepted Formats: PDF, DOC, DOCX (Max 10MB)</small>
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small text-muted">Cover Letter / Note to Recruiter</label>
                  <textarea
                    name="coverLetter"
                    rows="3"
                    className="form-control rounded-3"
                    placeholder="Briefly state your qualifications and why you are the ideal fit..."
                    value={formData.coverLetter}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-custom rounded-pill px-4" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Uploading & Submitting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill me-1"></i> Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
