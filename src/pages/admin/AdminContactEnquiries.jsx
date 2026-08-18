import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';

const AdminContactEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMsg, setSelectedMsg] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = statusFilter === 'All' ? '/contact/admin/all' : `/contact/admin/all?status=${statusFilter}`;
      const res = await API.get(url);
      if (res.data.success) {
        setEnquiries(res.data.enquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await API.put(`/contact/${id}/status`, { status: newStatus });
      if (res.data.success) {
        fetchEnquiries();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete enquiry permanently?')) {
      try {
        await API.delete(`/contact/${id}`);
        fetchEnquiries();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="admin-content flex-grow-1">
        <AdminHeader title="Manage Contact & Staffing Enquiries" />

        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold text-navy mb-0">Enquiries Inbox ({enquiries.length})</h5>
            <div className="d-flex align-items-center gap-2">
              <span className="small text-muted fw-semibold">Status:</span>
              <select
                className="form-select form-select-sm w-auto"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
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
                    <th>Sender Info</th>
                    <th>Subject Category</th>
                    <th>Message Snippet</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">No messages found.</td>
                    </tr>
                  ) : (
                    enquiries.map((e) => (
                      <tr key={e._id} className={e.status === 'unread' ? 'table-warning bg-opacity-10' : ''}>
                        <td>
                          <strong className="d-block text-dark">{e.name}</strong>
                          <small className="text-muted d-block">{e.email}</small>
                          <small className="text-muted d-block">{e.phone}</small>
                        </td>
                        <td>
                          {e.type === 'employee' ? (
                            <span className="badge bg-success text-white mb-1 d-inline-block">Employee Registration</span>
                          ) : e.type === 'employer' ? (
                            <span className="badge bg-info text-dark mb-1 d-inline-block">Employer Proposal</span>
                          ) : (
                            <span className="badge bg-navy-gradient text-white mb-1 d-inline-block">Contact Enquiry</span>
                          )}
                          <small className="d-block text-muted">{e.subject}</small>
                        </td>
                        <td>
                          <p className="text-muted small mb-0 line-clamp-2" style={{ maxWidth: '320px' }}>
                            {e.message || (e.company ? `Company: ${e.company}` : e.specialisation ? `Specialisation: ${e.specialisation}` : 'No message body')}
                          </p>
                        </td>
                        <td>{new Date(e.createdAt).toLocaleString()}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={e.status}
                            onChange={(ev) => handleUpdateStatus(e._id, ev.target.value)}
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="responded">Responded</option>
                          </select>
                        </td>
                        <td className="text-end">
                          <button onClick={() => { setSelectedMsg(e); handleUpdateStatus(e._id, 'read'); }} className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button onClick={() => handleDelete(e._id)} className="btn btn-sm btn-outline-danger">
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

        {/* VIEW MESSAGE MODAL */}
        {selectedMsg && (
          <div className="modal fade show d-block bg-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-navy-gradient text-white p-4">
                  <h5 className="modal-title fw-bold text-white">
                    {selectedMsg.type === 'employee' ? 'Employee CV Registration Details' : selectedMsg.type === 'employer' ? 'Employer Proposal Request Details' : 'Enquiry Message Inspector'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedMsg(null)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <small className="text-muted d-block">Applicant / Contact Name:</small>
                      <strong className="text-dark fs-5">{selectedMsg.name}</strong>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <small className="text-muted d-block">Submission Type:</small>
                      {selectedMsg.type === 'employee' ? (
                        <span className="badge bg-success fs-7">Employee Registration</span>
                      ) : selectedMsg.type === 'employer' ? (
                        <span className="badge bg-info text-dark fs-7">Employer Proposal</span>
                      ) : (
                        <span className="badge bg-primary fs-7">General Enquiry</span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-3 mb-3">
                    <div className="row g-2 small">
                      <div className="col-md-6">
                        <strong>Email:</strong> <a href={`mailto:${selectedMsg.email}`} className="text-decoration-none">{selectedMsg.email}</a>
                      </div>
                      <div className="col-md-6">
                        <strong>Phone:</strong> <a href={`tel:${selectedMsg.phone}`} className="text-decoration-none">{selectedMsg.phone}</a>
                      </div>

                      {/* Employer Details */}
                      {selectedMsg.company && (
                        <div className="col-md-6">
                          <strong>Company Name:</strong> {selectedMsg.company}
                        </div>
                      )}
                      {selectedMsg.jobTitle && (
                        <div className="col-md-6">
                          <strong>Job Title:</strong> {selectedMsg.jobTitle}
                        </div>
                      )}

                      {/* Employee Details */}
                      {selectedMsg.nationality && (
                        <div className="col-md-6">
                          <strong>Nationality:</strong> {selectedMsg.nationality}
                        </div>
                      )}
                      {selectedMsg.dob && (
                        <div className="col-md-6">
                          <strong>Date of Birth:</strong> {selectedMsg.dob}
                        </div>
                      )}
                      {selectedMsg.specialisation && (
                        <div className="col-md-6">
                          <strong>Specialisation:</strong> {selectedMsg.specialisation}
                        </div>
                      )}
                      {selectedMsg.qualificationLevel && (
                        <div className="col-md-6">
                          <strong>Qualification Level:</strong> {selectedMsg.qualificationLevel}
                        </div>
                      )}
                      {selectedMsg.preferredContract && (
                        <div className="col-md-6">
                          <strong>Preferred Contract:</strong> {selectedMsg.preferredContract}
                        </div>
                      )}
                      {selectedMsg.linkedIn && (
                        <div className="col-md-6">
                          <strong>LinkedIn Profile:</strong>{' '}
                          <a href={selectedMsg.linkedIn} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-underline">
                            View Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedMsg.message && (
                    <div className="p-3 bg-light rounded-3 mb-3">
                      <h6 className="fw-bold text-navy mb-2">Message / Details:</h6>
                      <p className="small text-muted mb-0 leading-relaxed whitespace-pre-line">{selectedMsg.message}</p>
                    </div>
                  )}

                  {selectedMsg.resumeUrl && (
                    <div className="p-3 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-3 mb-3 d-flex align-items-center justify-content-between">
                      <div>
                        <i className="bi bi-file-earmark-pdf-fill text-success fs-4 me-2"></i>
                        <span className="fw-semibold text-dark small">Uploaded Resume / CV</span>
                      </div>
                      <a
                        href={selectedMsg.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-success rounded-pill px-3"
                      >
                        <i className="bi bi-download me-1"></i> Download CV
                      </a>
                    </div>
                  )}

                  <div className="d-flex justify-content-end">
                    <button onClick={() => setSelectedMsg(null)} className="btn btn-outline-secondary rounded-pill px-4">Close</button>
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

export default AdminContactEnquiries;
