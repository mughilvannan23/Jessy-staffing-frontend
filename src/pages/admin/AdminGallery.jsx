import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const DEFAULT_CATEGORIES = ['School', 'Healthcare', 'Security', 'Corporate', 'Home Care', 'Events'];
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  const availableCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...items.map(i => i.category).filter(Boolean)
    ])
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Corporate',
    status: 'active'
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await API.get('/gallery/admin/all');
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({ title: '', description: '', category: 'Corporate', status: 'active' });
    setImageFile(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'Corporate',
      status: item.status || 'active'
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
      if (editingItem) {
        res = await API.put(`/gallery/${editingItem._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await API.post('/gallery', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (res.data.success) {
        setShowModal(false);
        fetchGallery();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete gallery item?')) {
      try {
        await API.delete(`/gallery/${id}`);
        fetchGallery();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="admin-content flex-grow-1">
        <AdminHeader title="Manage Visual Gallery" />

        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold text-navy mb-0">Gallery Items ({items.length})</h5>
            <button onClick={handleOpenCreate} className="btn btn-primary-custom rounded-pill">
              <i className="bi bi-cloud-upload-fill me-1"></i> Upload Gallery Image
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="row g-4">
              {items.map((item) => (
                <div key={item._id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100">
                    <img src={item.image} alt={item.title} className="w-100 object-fit-cover" style={{ height: '180px' }} />
                    <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                      <div>
                        <span className="badge bg-light text-primary border mb-1">{item.category}</span>
                        <h6 className="fw-bold text-navy mb-1 text-truncate">{item.title}</h6>
                        <small className="text-muted line-clamp-2">{item.description}</small>
                      </div>
                      <div className="pt-2 border-top mt-2 d-flex justify-content-between align-items-center">
                        <span className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                          {item.status}
                        </span>
                        <div>
                          <button onClick={() => handleOpenEdit(item)} className="btn btn-sm btn-link text-primary p-0 me-2">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-link text-danger p-0">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
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
                  <h5 className="modal-title fw-bold text-white">{editingItem ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Title *</label>
                    <input type="text" className="form-control" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                  </div>
                  <div className="mb-3">
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
                            setFormData({ ...formData, category: availableCategories[0] || 'Corporate' });
                          }}
                          title="Cancel Custom Category"
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Image File *</label>
                    <input type="file" accept="image/*" className="form-control" onChange={(e) => setImageFile(e.target.files[0])} required={!editingItem} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Description</label>
                    <textarea rows="2" className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
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
                    <button type="submit" className="btn btn-primary-custom rounded-pill">Upload & Save</button>
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

export default AdminGallery;
