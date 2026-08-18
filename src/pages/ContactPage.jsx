import React, { useState } from 'react';
import API from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
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
      const res = await API.post('/contact', formData);
      if (res.data.success) {
        setStatusMsg({ type: 'success', text: res.data.message });
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatusMsg({ type: 'danger', text: err.message || 'Failed to submit enquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page pt-navbar">
      <Breadcrumbs title="Contact & Consultation" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">GET IN TOUCH</span>
            <h1 className="display-5 fw-extrabold text-navy">Connect With Our HR Consultants</h1>
            <p className="text-muted">
              Whether you need to staff an entire medical facility, deploy asset security, or hire executive leadership, our team is ready 24/7.
            </p>
          </div>

          <div className="row g-5 mb-5">
            <div className="col-lg-5">
              <div className="p-4 p-md-5 rounded-4 bg-navy-gradient text-white shadow-lg h-100 d-flex flex-column justify-content-between">
                <div>
                  <h3 className="fw-bold text-white mb-4">Contact Information</h3>
                  <p className="text-light opacity-85 mb-4">
                    Visit our global headquarters or get in touch via phone and email for immediate staffing proposals.
                  </p>

                  <div className="d-flex flex-column gap-4 mb-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle bg-white bg-opacity-10 p-3 text-info">
                        <i className="bi bi-geo-alt-fill fs-4"></i>
                      </div>
                      <div>
                        <strong className="d-block text-white">Global Headquarters</strong>
                        <span className="text-light opacity-75 small">100 Enterprise Boulevard, Suite 500, Financial District, NY 10005</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle bg-white bg-opacity-10 p-3 text-info">
                        <i className="bi bi-telephone-fill fs-4"></i>
                      </div>
                      <div>
                        <strong className="d-block text-white">Direct Phone Support</strong>
                        <span className="text-light opacity-75 small">+1 (800) 555-2739 / +1 (212) 555-0199</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle bg-white bg-opacity-10 p-3 text-info">
                        <i className="bi bi-envelope-fill fs-4"></i>
                      </div>
                      <div>
                        <strong className="d-block text-white">Email Address</strong>
                        <span className="text-light opacity-75 small">contact@apexstaffing.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-top border-white border-opacity-20">
                  <small className="text-light opacity-75 d-block mb-2">Connect via WhatsApp for Instant Response:</small>
                  <a
                    href="https://wa.me/18005552739"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-info text-white rounded-pill px-4 fw-bold"
                  >
                    <i className="bi bi-whatsapp me-2"></i> WhatsApp Live Chat
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="p-4 p-md-5 rounded-4 bg-light shadow-sm border">
                <h3 className="fw-bold text-navy mb-4">Send Us a Direct Message</h3>

                {statusMsg.text && (
                  <div className={`alert alert-${statusMsg.type} py-2 px-3 small rounded-3 mb-4`}>
                    {statusMsg.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-muted">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control rounded-3"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-muted">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control rounded-3"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-muted">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control rounded-3"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-muted">Inquiry Subject *</label>
                      <select
                        name="subject"
                        className="form-select rounded-3"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Subject Category</option>
                        <option value="School Staffing Inquiry">School Staffing Inquiry</option>
                        <option value="Security Guard Deployment">Security Guard Deployment</option>
                        <option value="Healthcare Personnel Request">Healthcare Personnel Request</option>
                        <option value="Home Nursing Assistance">Home Nursing Assistance</option>
                        <option value="Corporate HR & Executive Recruitment">Corporate HR & Executive Recruitment</option>
                        <option value="Payroll Outsourcing Contract">Payroll Outsourcing Contract</option>
                        <option value="General Consultation">General Consultation</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small text-muted">Message Details *</label>
                      <textarea
                        name="message"
                        rows="4"
                        className="form-control rounded-3"
                        placeholder="Describe your staffing requirements, timeline, and headcount..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary-custom rounded-pill px-5 py-3 mt-4" disabled={loading}>
                    {loading ? 'Submitting...' : 'Send Message Now'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* GOOGLE MAPS EMBED */}
          <div className="rounded-4 overflow-hidden shadow-sm border" style={{ height: '400px' }}>
            <iframe
              title="Apex Global Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2543635164!2d-74.11976373946229!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
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
