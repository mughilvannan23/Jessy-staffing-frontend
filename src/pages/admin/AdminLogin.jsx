import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@staffing.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result && result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result?.message || 'Invalid admin login credentials');
    }
  };

  return (
    <div className="min-vh-100 bg-navy-gradient d-flex align-items-center justify-content-center p-3">
      <div className="card border-0 rounded-4 shadow-lg overflow-hidden w-100" style={{ maxWidth: '440px' }}>
        <div className="card-body p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <div className="rounded-3 bg-navy-gradient text-white p-3 d-inline-flex align-items-center justify-content-center mb-3 shadow">
              <i className="bi bi-shield-lock-fill fs-2"></i>
            </div>
            <h4 className="fw-extrabold text-navy mb-1">Apex Admin Portal</h4>
            <small className="text-muted">Enter credentials to manage HR platform</small>
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-4">
              <i className="bi bi-exclamation-triangle-fill me-1"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold small text-muted">Admin Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light"><i className="bi bi-envelope"></i></span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold small text-muted">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light"><i className="bi bi-lock"></i></span>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <small className="text-muted fs-8 mt-1 d-block">Default Login: admin@staffing.com / Admin@123</small>
            </div>

            <button type="submit" className="btn btn-primary-custom w-100 rounded-pill py-3 fw-bold" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
