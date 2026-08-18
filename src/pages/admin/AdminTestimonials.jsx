import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    review: '',
    rating: 5,
    status: 'active'
  });
  const [photoFile, setPhotoFile] = useState(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await API.get('/testimonials/admin/all');
      if (res.data.success) {
        setTestimonials(res.data.testimonials);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({ name: '', designation: '', company: '', review: '', rating: 5, status: 'active' });
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setFormData({
      name: t.name || '',
      designation: t.designation || '',
      company: t.company || '',
      review: t.review || '',
      rating: t.rating || 5,
      status: t.status || 'active'
    });
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((k) => data.append(k, formData[k]));
      if (photoFile) data.append('photoFile', photoFile);

      let res;
      if (editingItem) {
        res = await API.put(`/testimonials/${editingItem._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await API.post('/testimonials', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (res.data.success) {
        setShowModal(false);
        fetchTestimonials();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete testimonial entry?')) {
      try {
        await API.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="admin-content flex-grow-1">
        <AdminHeader title="Manage Testimonials & Client Reviews" />

        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold text-navy mb-0">Testimonials ({testimonials.length})</h5>
            <button onClick={handleOpenCreate} className="btn btn-primary-custom rounded-pill">
              <i className="bi bi-plus-circle-fill me-1"></i> Add Review
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Reviewer Name</th>
                    <th>Designation & Company</th>
                    <th>Rating</th>
                    <th>Review Snippet</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((t) => (
                    <tr key={t._id}>
                      <td>
                        <strong className="d-block text-dark">{t.name}</strong>
                      </td>
                      <td>{t.designation} &bull; {t.company}</td>
                      <td>
                        <div className="text-warning small">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                        </div>
                      </td>
                      <td>
                        <small className="text-muted line-clamp-2" style={{ maxWidth: '300px' }}>{t.review}</small>
                      </td>
                      <td>
                        <span className={`badge ${t.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>{t.status}</span>
                      </td>
                      <td className="text-end">
                        <button onClick={() => handleOpenEdit(t)} className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button onClick={() => handleDelete(t._id)} className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showModal && (
          <div className="modal fade show d-block bg-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-navy-gradient text-white p-4">
                  <h5 className="modal-title fw-bold text-white">{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Reviewer Name *</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Designation *</label>
                    <input type="text" className="form-control" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Company Name</label>
                    <input type="text" className="form-control" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Review Text *</label>
                    <textarea rows="3" className="form-control" value={formData.review} onChange={(e) => setFormData({ ...formData, review: e.target.value })} required></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Rating (1 to 5 Stars)</label>
                    <input type="number" min="1" max="5" className="form-control" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Photo File</label>
                    <input type="file" accept="image/*" className="form-control" onChange={(e) => setPhotoFile(e.target.files[0])} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="mt-4 border-top pt-3 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary-custom rounded-pill">Save Testimonial</button>
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

export default AdminTestimonials;
