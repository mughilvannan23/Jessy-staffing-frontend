import React, { useState } from 'react';
import API from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Jessy Staffing',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'N/A',
        subject: formData.service || 'Jessy Staffing Inquiry',
        message: formData.message
      };

      const res = await API.post('/contact', payload);
      if (res.data.success) {
        setStatusMsg({ type: 'success', text: res.data.message });
        setFormData({ name: '', phone: '', email: '', service: 'Jessy Staffing', message: '' });
      }
    } catch (err) {
      setStatusMsg({ type: 'danger', text: err.message || 'Failed to submit enquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page pt-navbar contact-section-dark min-vh-100 pb-5">
      <Breadcrumbs title="Contact Us" />

      <section className="py-5 position-relative">
        <div className="container">
          {/* Header Section with Let's Connect watermark style */}
          <div className="text-center max-w-2xl mx-auto mb-5 position-relative contact-watermark-title">
            <h1 className="display-6 fw-bold text-white mb-3 position-relative z-1">
              Have a question or want to know more about our services? Get in touch with Jessy Agencies today.
            </h1>
          </div>

          <div className="row g-4 mb-5">
            {/* Left Box: Contact Information */}
            <div className="col-lg-5">
              <div className="p-4 p-md-5 rounded-4 contact-info-card shadow-lg h-100 d-flex flex-column justify-content-between">
                <div>
                  <h3 className="fw-bold text-white mb-4">Contact Information</h3>

                  <div className="d-flex flex-column gap-4">
                    {/* Founder */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box">
                        <i className="bi bi-person-fill"></i>
                      </div>
                      <div>
                        <small className="d-block text-uppercase fw-bold text-light opacity-75" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                          FOUNDER
                        </small>
                        <strong className="text-white fs-6">B. Devaraj</strong>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="d-flex align-items-start gap-3">
                      <div className="contact-icon-box mt-1">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <div>
                        <small className="d-block text-uppercase fw-bold text-light opacity-75" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                          ADDRESS
                        </small>
                        <strong className="text-white fs-6 lh-base">
                          No 267, Ramu Army Complex, Vettavalam Road, Enthal Bypass, Tiruvannamalai - 606601
                        </strong>
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box">
                        <i className="bi bi-phone-fill"></i>
                      </div>
                      <div>
                        <small className="d-block text-uppercase fw-bold text-light opacity-75" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                          MOBILE
                        </small>
                        <a href="tel:8056567352" className="text-white text-decoration-none fw-bold me-2">8056567352</a>
                        <span className="text-light opacity-50">/</span>
                        <a href="tel:9487577852" className="text-white text-decoration-none fw-bold ms-2">9487577852</a>
                      </div>
                    </div>

                    {/* Office */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box">
                        <i className="bi bi-telephone-fill"></i>
                      </div>
                      <div>
                        <small className="d-block text-uppercase fw-bold text-light opacity-75" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                          OFFICE
                        </small>
                        <a href="tel:04175252535" className="text-white text-decoration-none fw-bold">04175-252535</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-top border-white border-opacity-10">
                  <small className="text-light opacity-75 d-block mb-2">Connect via WhatsApp for Instant Response:</small>
                  <a
                    href="https://wa.me/918056567352"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-info text-white rounded-pill px-4 fw-bold shadow-sm"
                  >
                    <i className="bi bi-whatsapp me-2"></i> WhatsApp Live Chat
                  </a>
                </div>
              </div>
            </div>

            {/* Right Box: Contact Form */}
            <div className="col-lg-7">
              <div className="p-4 p-md-5 rounded-4 contact-form-card shadow-lg">
                {statusMsg.text && (
                  <div className={`alert alert-${statusMsg.type} py-2 px-3 small rounded-3 mb-4`}>
                    {statusMsg.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-light">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control contact-input-dark"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-light">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control contact-input-dark"
                        placeholder="Your Mobile Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-light">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control contact-input-dark"
                        placeholder="name@example.com (Optional)"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-light">Select Service *</label>
                      <select
                        name="service"
                        className="form-select contact-select-dark"
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="Jessy Staffing">Jessy Staffing</option>
                        <option value="School & Educational Staffing">School & Educational Staffing</option>
                        <option value="Security & Guard Services">Security & Guard Services</option>
                        <option value="Healthcare Personnel">Healthcare Personnel</option>
                        <option value="Home Care & Nursing">Home Care & Nursing</option>
                        <option value="Corporate Executive Staffing">Corporate Executive Staffing</option>
                        <option value="Payroll Outsourcing">Payroll Outsourcing</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small text-light">Message</label>
                      <textarea
                        name="message"
                        rows="4"
                        className="form-control contact-input-dark"
                        placeholder="How can Jessy Agencies help you?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-send-enquiry w-100 mt-4 d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                    {loading ? 'Submitting...' : (
                      <>
                        <span>Send Enquiry</span>
                        <i className="bi bi-send-fill fs-6"></i>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* GOOGLE MAPS EMBED - Tiruvannamalai */}
          <div className="rounded-4 overflow-hidden shadow-sm border border-secondary border-opacity-25" style={{ height: '380px' }}>
            <iframe
              title="Jessy Agencies Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15589.673895982885!2d79.0558661!3d12.2274438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacc084cf73e721%3A0x6732f913d09a2503!2sTiruvannamalai%2C%20Tamil%20Nadu%20606601!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

