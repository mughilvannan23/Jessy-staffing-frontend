import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminHeader = ({ title }) => {
  const { admin } = useContext(AuthContext);

  return (
    <header className="bg-white rounded-4 shadow-sm p-3 mb-4 d-flex align-items-center justify-content-between border">
      <div>
        <h4 className="fw-extrabold text-navy mb-0">{title}</h4>
        <small className="text-muted">Enterprise Staffing Control System</small>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Link to="/" target="_blank" className="btn btn-outline-custom btn-sm rounded-pill">
          <i className="bi bi-globe me-1"></i> Live Website
        </Link>

        <div className="d-flex align-items-center gap-2 ps-3 border-start">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '38px', height: '38px' }}>
            {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div>
            <span className="fw-bold fs-7 d-block leading-none text-dark">{admin?.name || 'Administrator'}</span>
            <small className="text-muted fs-8">{admin?.email || 'admin@staffing.com'}</small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
