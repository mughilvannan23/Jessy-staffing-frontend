import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

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

  const closeNav = () => {
    const navbarCollapse = document.getElementById('navbarContent');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      if (window.bootstrap && window.bootstrap.Collapse) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse) || new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
  };

  useEffect(() => {
    closeNav();
  }, [location.pathname]);

  // Hide main navbar if inside /admin dashboard
  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return null;
  }

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar navbar-expand-lg fixed-top navbar-custom ${scrolled || !isHome ? 'scrolled' : 'bg-transparent'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeNav}>
          <img
            src={logoImg}
            alt="Jessy Agencies Logo"
            className="bg-white p-1 rounded-2 shadow-sm"
            style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
          />
          <div>
            <span className="fw-extrabold fs-4 nav-logo-text d-block lh-1">JESSY AGENCIES</span>
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
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" onClick={closeNav}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about" onClick={closeNav}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname.startsWith('/careers') ? 'active' : ''}`} to="/careers" onClick={closeNav}>
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact" onClick={closeNav}>
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/employee-registration' ? 'active' : ''}`} to="/employee-registration" onClick={closeNav}>
                Employee Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/employer-registration' ? 'active' : ''}`} to="/employer-registration" onClick={closeNav}>
                Employer Registration
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/careers" className="btn btn-outline-custom-nav btn-sm rounded-pill px-3" onClick={closeNav}>
              <i className="bi bi-search me-1"></i> Search Jobs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
