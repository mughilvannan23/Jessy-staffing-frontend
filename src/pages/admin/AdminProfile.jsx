import React, { useState, useContext } from 'react';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

const AdminProfile = () => {
  const { admin, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(admin?.name || '');
  const [email, setEmail] = useState(admin?.email || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    const res = await updateProfile({ name, email });
    if (res && res.success) {
      setProfileMsg({ type: 'success', text: 'Admin profile details updated successfully!' });
    } else {
      setProfileMsg({ type: 'danger', text: res?.message || 'Profile update failed' });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassMsg({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setPassMsg({ type: 'danger', text: 'New passwords do not match' });
      return;
    }

    try {
      const res = await API.put('/auth/change-password', { currentPassword, newPassword });
      if (res.data.success) {
        setPassMsg({ type: 'success', text: res.data.message });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setPassMsg({ type: 'danger', text: err.message || 'Password update failed' });
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="admin-content flex-grow-1">
        <AdminHeader title="Admin Account Settings & Security" />

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
              <h5 className="fw-bold text-navy mb-4">Account Information</h5>

              {profileMsg.text && (
                <div className={`alert alert-${profileMsg.type} py-2 px-3 small rounded-3 mb-3`}>
                  {profileMsg.text}
                </div>
              )}

              <form onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">Admin Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-muted">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary-custom rounded-pill px-4">
                  Update Account Details
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
              <h5 className="fw-bold text-navy mb-4">Change Password</h5>

              {passMsg.text && (
                <div className={`alert alert-${passMsg.type} py-2 px-3 small rounded-3 mb-3`}>
                  {passMsg.text}
                </div>
              )}

              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-muted">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-outline-danger rounded-pill px-4">
                  Change Admin Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
