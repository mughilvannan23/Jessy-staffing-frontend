import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const location = useLocation();

  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return null;
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-gradient text-white pt-5 pb-4 mt-5 position-relative overflow-hidden">
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '400px',
          height: '400px',
          background: 'rgba(42, 141, 216, 0.12)',
          top: '-100px',
          right: '-100px',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
      ></div>

      <div className="container position-relative z-1">
        <div className="row g-4 pb-4 border-bottom border-secondary border-opacity-25">
          <div className="col-lg-5 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="rounded-3 bg-white text-primary p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-briefcase-fill fs-5" style={{ color: '#0B4F81' }}></i>
              </div>
              <span className="fw-extrabold fs-4 text-white">APEX GLOBAL</span>
            </div>
            <p className="text-light opacity-75 small leading-relaxed mb-4" style={{ maxWidth: '400px' }}>
              International leader in executive placement, school staffing, healthcare clinical deployment, facility security, and corporate HR outsourcing solutions.
            </p>

            <div className="d-flex gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3">Quick Navigation</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-light text-decoration-none opacity-75 hover-opacity-100">Home</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none opacity-75 hover-opacity-100">About Us</Link></li>
              <li><Link to="/careers" className="text-light text-decoration-none opacity-75 hover-opacity-100">Careers & Job Listings</Link></li>
              <li><Link to="/register" className="text-light text-decoration-none opacity-75 hover-opacity-100 fw-bold text-success">Online Registration (Employee & Employer)</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none opacity-75 hover-opacity-100">Contact Us</Link></li>
              <li><Link to="/admin/login" className="text-light text-decoration-none opacity-75 hover-opacity-100 text-info">Admin Portal</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="text-white fw-bold mb-3">Newsletter & Updates</h6>
            <p className="text-light opacity-75 small">Subscribe to receive executive talent insights and market reports.</p>
            
            {subscribed ? (
              <div className="alert alert-success py-2 px-3 small rounded-3 mb-0" role="alert">
                <i className="bi bi-check-circle-fill me-1"></i> Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control form-control-sm bg-white bg-opacity-10 text-white border-secondary border-opacity-50 placeholder-white-50"
                    placeholder="Enter business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn btn-info text-white btn-sm px-3" type="submit">
                    Join
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-2">
              <small className="d-block text-light opacity-75"><i className="bi bi-geo-alt-fill text-info me-2"></i> 100 Enterprise Blvd, Financial District, NY</small>
              <small className="d-block text-light opacity-75 mt-1"><i className="bi bi-telephone-fill text-info me-2"></i> +1 (800) 555-2739</small>
            </div>
          </div>
        </div>

        <div className="pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 small text-light opacity-75">
          <div>
            &copy; {new Date().getFullYear()} Apex Global Staffing & HR Solutions Inc. All rights reserved.
          </div>
          <div className="d-flex gap-3">
            <a href="#privacy" className="text-light text-decoration-none">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="text-light text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
