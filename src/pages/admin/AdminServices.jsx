import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const DEFAULT_CATEGORIES = ['School Staffing', 'Security Staffing', 'Healthcare Staffing', 'Home Care', 'Corporate Staffing', 'HR Outsourcing'];
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  const availableCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...services.map(s => s.category).filter(Boolean)
    ])
  );

  const [formData, setFormData] = useState({
    title: '',
    category: 'School Staffing',
    shortDescription: '',
    description: '',
    icon: 'bi-briefcase-fill',
    features: '',
    rolesProvided: '',
    status: 'active',
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await API.get('/services/admin/all');
      if (res.data.success) {
        setServices(res.data.services);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingService(null);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({
      title: '',
      category: 'School Staffing',
      shortDescription: '',
      description: '',
      icon: 'bi-briefcase-fill',
      features: '',
      rolesProvided: '',
      status: 'active',
      order: 0
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleOpenEdit = (s) => {
    setEditingService(s);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({
      title: s.title || '',
      category: s.category || 'School Staffing',
      shortDescription: s.shortDescription || '',
      description: s.description || '',
      icon: s.icon || 'bi-briefcase-fill',
      features: Array.isArray(s.features) ? s.features.join('\n') : s.features || '',
      rolesProvided: Array.isArray(s.rolesProvided) ? s.rolesProvided.join(', ') : s.rolesProvided || '',
      status: s.status || 'active',
      order: s.order || 0
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((k) => data.append(k, formData[k]));
      if (imageFile) data.append('imageFile', imageFile);

      let res;
      if (editingService) {
        res = await API.put(`/services/${editingService._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await API.post('/services', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (res.data.success) {
        setShowModal(false);
        fetchServices();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete service division?')) {
      try {
        await API.delete(`/services/${id}`);
        fetchServices();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="admin-content flex-grow-1">
        <AdminHeader title="Manage Service Divisions" />

        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold text-navy mb-0">Services ({services.length})</h5>
            <button onClick={handleOpenCreate} className="btn btn-primary-custom rounded-pill">
              <i className="bi bi-plus-circle-fill me-1"></i> Add Service Division
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Icon</th>
                    <th>Status</th>
                    <th>Order</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s._id}>
                      <td>
                        <strong className="d-block text-dark">{s.title}</strong>
                        <small className="text-muted">{s.shortDescription}</small>
                      </td>
                      <td><span className="badge bg-light text-primary border">{s.category}</span></td>
                      <td><i className={`bi ${s.icon} fs-5 text-primary`}></i></td>
                      <td>
                        <span className={`badge ${s.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td>{s.order}</td>
                      <td className="text-end">
                        <button onClick={() => handleOpenEdit(s)} className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button onClick={() => handleDelete(s._id)} className="btn btn-sm btn-outline-danger">
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
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-navy-gradient text-white p-4">
                  <h5 className="modal-title fw-bold text-white">{editingService ? 'Edit Service' : 'Add Service Division'}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Service Title *</label>
                      <input type="text" className="form-control" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Category *</label>
                      <select
                        className="form-select"
                        value={isCustomCategory ? 'CUSTOM_OPTION' : formData.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'CUSTOM_OPTION') {
                            setIsCustomCategory(true);
                            setCustomCategoryInput('');
                            setFormData({ ...formData, category: '' });
                          } else {
                            setIsCustomCategory(false);
                            setFormData({ ...formData, category: val });
                          }
                        }}
                      >
                        {availableCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="CUSTOM_OPTION">+ Add Custom Category...</option>
                      </select>

                      {isCustomCategory && (
                        <div className="input-group mt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type custom category name..."
                            value={customCategoryInput}
                            onChange={(e) => {
                              setCustomCategoryInput(e.target.value);
                              setFormData({ ...formData, category: e.target.value });
                            }}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => {
                              setIsCustomCategory(false);
                              setFormData({ ...formData, category: availableCategories[0] || 'School Staffing' });
                            }}
                            title="Cancel Custom Category"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Icon Class (Bootstrap Icon)</label>
                      <input type="text" className="form-control" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="bi-mortarboard-fill" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Display Order</label>
                      <input type="number" className="form-control" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-muted">Short Description *</label>
                      <input type="text" className="form-control" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-muted">Full Description *</label>
                      <textarea rows="3" className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Features (Line Separated)</label>
                      <textarea rows="3" className="form-control" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })}></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Roles Provided (Comma Separated)</label>
                      <textarea rows="3" className="form-control" value={formData.rolesProvided} onChange={(e) => setFormData({ ...formData, rolesProvided: e.target.value })}></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Cover Image Upload</label>
                      <input type="file" accept="image/*" className="form-control" onChange={(e) => setImageFile(e.target.files[0])} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Status</label>
                      <select className="form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 border-top pt-3 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary-custom rounded-pill">Save Division</button>
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

export default AdminServices;
