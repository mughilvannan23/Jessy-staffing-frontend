import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar p-3 d-flex flex-column justify-content-between">
      <div>
        <div className="d-flex align-items-center gap-2 px-2 py-3 mb-4 border-bottom border-secondary border-opacity-25">
          <div className="rounded-3 bg-accent text-white p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '38px', height: '38px', background: '#2A8DD8' }}>
            <i className="bi bi-shield-check fs-5"></i>
          </div>
          <div>
            <h6 className="fw-bold text-white mb-0">JESSY ADMIN</h6>
            <small className="text-info fs-7 fw-bold">CONTROL DASHBOARD</small>
          </div>
        </div>

        <nav className="nav flex-column">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bi bi-speedometer2"></i> Dashboard Overview
          </NavLink>
          <NavLink to="/admin/jobs" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bi bi-briefcase-fill"></i> Manage Jobs
          </NavLink>
          <NavLink to="/admin/applications" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bi bi-file-earmark-person-fill"></i> Candidate Applications
          </NavLink>
          <NavLink to="/admin/enquiries" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bi bi-envelope-paper-fill"></i> Contact Enquiries
          </NavLink>
          <NavLink to="/admin/testimonials" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bi bi-quote"></i> Testimonials
          </NavLink>
          <NavLink to="/admin/clients" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bi bi-building"></i> Client Partners
          </NavLink>
          <NavLink to="/admin/profile" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <i className="bi bi-person-circle"></i> Admin Profile
          </NavLink>
        </nav>
      </div>

      <div className="pt-3 border-top border-secondary border-opacity-25">
        <button onClick={handleLogout} className="btn btn-outline-danger w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 py-2 small fw-bold">
          <i className="bi bi-box-arrow-right"></i> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
