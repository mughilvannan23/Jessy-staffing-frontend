import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({ companyName: '', website: '', status: 'active', order: 0 });
  const [logoFile, setLogoFile] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await API.get('/clients/admin/all');
      if (res.data.success) {
        setClients(res.data.clients);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(k => data.append(k, formData[k]));
      if (logoFile) data.append('logoFile', logoFile);

      const res = await API.post('/clients', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setShowModal(false);
        fetchClients();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete corporate client partner?')) {
      try {
        await API.delete(`/clients/${id}`);
        fetchClients();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="admin-content flex-grow-1">
        <AdminHeader title="Manage Corporate Clients & Logos" />

        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold text-navy mb-0">Corporate Partners ({clients.length})</h5>
            <button onClick={() => setShowModal(true)} className="btn btn-primary-custom rounded-pill">
              <i className="bi bi-plus-circle-fill me-1"></i> Add Corporate Logo
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="row g-4">
              {clients.map((c) => (
                <div key={c._id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card border rounded-4 p-3 text-center h-100 shadow-sm">
                    <div style={{ height: '70px' }} className="d-flex align-items-center justify-content-center mb-2">
                      <img src={c.logo} alt={c.companyName} className="img-fluid" style={{ maxHeight: '50px', objectFit: 'contain' }} />
                    </div>
                    <h6 className="fw-bold text-navy mb-1">{c.companyName}</h6>
                    <small className="text-muted d-block mb-3">{c.website || 'No website link'}</small>
                    <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-outline-danger w-100 rounded-pill">
                      <i className="bi bi-trash me-1"></i> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showModal && (
          <div className="modal fade show d-block bg-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-navy-gradient text-white p-4">
                  <h5 className="modal-title fw-bold text-white">Add Corporate Partner Logo</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Company Name *</label>
                    <input type="text" className="form-control" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Website URL</label>
                    <input type="text" className="form-control" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://example.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Logo File *</label>
                    <input type="file" accept="image/*" className="form-control" onChange={(e) => setLogoFile(e.target.files[0])} required />
                  </div>
                  <div className="mt-4 border-top pt-3 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary-custom rounded-pill">Save Partner</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminClients;
