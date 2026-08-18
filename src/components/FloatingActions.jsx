import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return null;
  }

  return (
    <div className="floating-actions-container">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/18005552739?text=Hello%20Apex%20Global%20Staffing,%20I%20would%20like%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noreferrer"
        className="btn-floating btn-whatsapp"
        title="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+18005552739"
        className="btn-floating btn-call"
        title="Call Us Now"
      >
        <i className="bi bi-telephone-fill"></i>
      </a>

      {/* Back To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="btn-floating btn-scroll-top"
          title="Scroll To Top"
        >
          <i className="bi bi-arrow-up-short fs-2"></i>
        </button>
      )}
    </div>
  );
};

export default FloatingActions;
