import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const url = statusFilter === 'All' ? '/applications/admin/all' : `/applications/admin/all?status=${statusFilter}`;
      const res = await API.get(url);
      if (res.data.success) {
        setApplications(res.data.applications);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      const res = await API.put(`/applications/${appId}/status`, { status: newStatus });
      if (res.data.success) {
        fetchApplications();
      }
    } catch (err) {
      alert(err.message || 'Status update failed');
    }
  };

  const handleDelete = async (appId) => {
    if (window.confirm('Delete candidate application entry permanently?')) {
      try {
        await API.delete(`/applications/${appId}`);
        fetchApplications();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <main className="admin-content flex-grow-1">
        <AdminHeader title="Candidate Applications Center" />

        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h5 className="fw-bold text-navy mb-0">Submissions ({applications.length})</h5>

            <div className="d-flex align-items-center gap-2">
              <span className="small text-muted fw-semibold">Filter Status:</span>
              <select
                className="form-select form-select-sm w-auto"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Candidate</th>
                    <th>Target Position</th>
                    <th>Qualification</th>
                    <th>Experience</th>
                    <th>Expected Salary</th>
                    <th>Resume / CV</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">No applications match the current filter.</td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app._id}>
                        <td>
                          <strong className="d-block text-dark">{app.name}</strong>
                          <small className="text-muted d-block">{app.email}</small>
                          <small className="text-muted d-block">{app.phone}</small>
                        </td>
                        <td>
                          <span className="fw-bold text-navy">{app.jobId ? app.jobId.jobTitle : 'Role Deleted'}</span>
                          {app.jobId && <small className="d-block text-muted">{app.jobId.category} &bull; {app.jobId.location}</small>}
                        </td>
                        <td>{app.qualification}</td>
                        <td>{app.experience}</td>
                        <td><span className="fw-bold text-primary">{app.expectedSalary || 'N/A'}</span></td>
                        <td>
                          {app.resumeUrl ? (
                            <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-info rounded-pill">
                              <i className="bi bi-file-earmark-pdf me-1"></i> View Resume
                            </a>
                          ) : (
                            <span className="text-muted small">No File</span>
                          )}
                        </td>
                        <td>
                          <select
                            className={`form-select form-select-sm fw-bold ${
                              app.status === 'selected' ? 'text-success border-success' :
                              app.status === 'rejected' ? 'text-danger border-danger' :
                              app.status === 'reviewed' ? 'text-primary border-primary' : 'text-warning border-warning'
                            }`}
                            value={app.status}
                            onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="selected">Selected</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="text-end">
                          <button onClick={() => setSelectedApp(app)} className="btn btn-sm btn-outline-primary me-1" title="Inspect Full Cover Letter">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button onClick={() => handleDelete(app._id)} className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* CANDIDATE INSPECTOR MODAL */}
        {selectedApp && (
          <div className="modal fade show d-block bg-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-navy-gradient text-white p-4">
                  <h5 className="modal-title fw-bold text-white">Candidate Details & Cover Letter</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedApp(null)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <small className="text-muted d-block">Candidate Name:</small>
                      <strong className="text-dark fs-5">{selectedApp.name}</strong>
                    </div>
                    <div className="col-md-6">
                      <small className="text-muted d-block">Position Applied:</small>
                      <strong className="text-primary fs-5">{selectedApp.jobId ? selectedApp.jobId.jobTitle : 'N/A'}</strong>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted d-block">Email:</small>
                      <span>{selectedApp.email}</span>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted d-block">Phone:</small>
                      <span>{selectedApp.phone}</span>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted d-block">Address:</small>
                      <span>{selectedApp.address || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-3 mb-4">
                    <h6 className="fw-bold text-navy mb-2">Cover Letter / Note:</h6>
                    <p className="small text-muted mb-0 leading-relaxed whitespace-pre-line">
                      {selectedApp.coverLetter || 'No cover letter provided by candidate.'}
                    </p>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    {selectedApp.resumeUrl && (
                      <a href={selectedApp.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-info text-white rounded-pill px-4">
                        <i className="bi bi-download me-1"></i> Download Resume
                      </a>
                    )}
                    <button onClick={() => setSelectedApp(null)} className="btn btn-outline-secondary rounded-pill px-4">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminApplications;
