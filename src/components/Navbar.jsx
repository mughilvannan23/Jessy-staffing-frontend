import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide main navbar if inside /admin dashboard
  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return null;
  }

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar navbar-expand-lg fixed-top navbar-custom ${scrolled || !isHome ? 'scrolled' : 'bg-transparent'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="rounded-3 bg-navy-gradient text-white p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '42px', height: '42px' }}>
            <i className="bi bi-briefcase-fill fs-5"></i>
          </div>
          <div>
            <span className="fw-extrabold fs-4 nav-logo-text d-block lh-1">APEX GLOBAL</span>
            <small className="nav-sub-text fw-bold tracking-wider fs-7" style={{ fontSize: '0.68rem', letterSpacing: '1px' }}>
              STAFFING & HR SOLUTIONS
            </small>
          </div>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname.startsWith('/careers') ? 'active' : ''}`} to="/careers">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/employee-registration' ? 'active' : ''}`} to="/employee-registration">
                Employee Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/employer-registration' ? 'active' : ''}`} to="/employer-registration">
                Employer Registration
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/careers" className="btn btn-outline-custom-nav btn-sm rounded-pill px-3">
              <i className="bi bi-search me-1"></i> Search Jobs
            </Link>
            {/* <Link to="/admin/login" className="btn btn-primary-custom btn-sm rounded-pill px-3">
              <i className="bi bi-shield-lock-fill me-1"></i> Admin Portal
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
