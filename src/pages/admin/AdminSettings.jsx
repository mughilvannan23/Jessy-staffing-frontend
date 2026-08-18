import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    tagline: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    whatsappNumber: '',
    metaTitle: '',
    metaDescription: '',
    googleMapsUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/settings');
        if (res.data.success && res.data.settings) {
          setSettings(res.data.settings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    try {
      const res = await API.put('/settings', settings);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Website & SEO Settings updated successfully!' });
      }
    } catch (err) {
      setMsg({ type: 'danger', text: err.message || 'Failed to update settings' });
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="admin-content flex-grow-1">
        <AdminHeader title="Website & SEO Configuration Settings" />

        {msg.text && (
          <div className={`alert alert-${msg.type} py-2 px-3 small rounded-3 mb-4`}>
            {msg.text}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="card border-0 rounded-4 shadow-sm p-4 bg-white">
            <h5 className="fw-bold text-navy mb-4">General Site Identity & Contact Info</h5>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Site Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.siteName || ''}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Tagline</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.tagline || ''}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Contact Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={settings.contactEmail || ''}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Contact Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.contactPhone || ''}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">WhatsApp Support Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold text-muted">Headquarters Physical Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.address || ''}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>
            </div>

            <h5 className="fw-bold text-navy mb-4 border-top pt-4">SEO & Metadata Configuration</h5>

            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="form-label small fw-semibold text-muted">Global Meta Title (SEO)</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.metaTitle || ''}
                  onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold text-muted">Global Meta Description (SEO)</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={settings.metaDescription || ''}
                  onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                ></textarea>
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold text-muted">Google Maps Embed URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.googleMapsUrl || ''}
                  onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary-custom rounded-pill px-5 py-3 fw-bold">
                Save Website Settings
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default AdminSettings;
