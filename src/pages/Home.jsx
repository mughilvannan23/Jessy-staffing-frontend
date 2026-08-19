import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../services/api';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';
import Loader from '../components/Loader';
import IndustriesSection from '../components/IndustriesSection';


const Home = () => {
  const [services, setServices] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJobForApply, setSelectedJobForApply] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servRes, jobsRes, testRes, clientRes] = await Promise.all([
          API.get('/services'),
          API.get('/jobs?isFeatured=true&limit=6'),
          API.get('/testimonials'),
          API.get('/clients')
        ]);

        if (servRes.data.success) setServices(servRes.data.services);
        if (jobsRes.data.success) setFeaturedJobs(jobsRes.data.jobs);
        if (testRes.data.success) setTestimonials(testRes.data.testimonials);
        if (clientRes.data.success) setClients(clientRes.data.clients);
      } catch (err) {
        console.error('Home page data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page overflow-hidden">
      {/* 1. HERO BANNER */}
      <section className="position-relative pt-5 pb-5 min-vh-100 d-flex align-items-center bg-navy-gradient text-white">
        <div
          className="position-absolute top-0 end-0 rounded-circle opacity-25"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, #2A8DD8 0%, rgba(11,79,129,0) 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }}
        ></div>

        <div className="container position-relative z-2 pt-5">
          <div className="row align-items-center g-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-lg-7"
            >
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-20 mb-3 backdrop-blur">
                <span className="badge bg-info text-white rounded-pill px-2">ISO 9001 Certified</span>
                <small className="text-light fw-semibold">Global HR & Executive Staffing Solutions</small>
              </div>

              <h1 className="display-4 fw-extrabold text-white leading-tight mb-4">
                Empowering Enterprises With <span className="text-gradient d-inline-block">World-Class Talent</span> & HR Excellence.
              </h1>

              <p className="lead text-light opacity-90 mb-4 leading-relaxed max-w-2xl">
                We deliver tailored workforce solutions across Healthcare, Academic Institutions, High-Security Assets, Corporate Enterprises, and HR Outsourcing.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/careers" className="btn btn-primary-custom btn-lg rounded-pill px-4 py-3">
                  <i className="bi bi-briefcase-fill me-2"></i> Explore Open Careers
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg rounded-pill px-4 py-3">
                  <i className="bi bi-telephone-fill me-2"></i> Request Consultation
                </Link>
              </div>

              <div className="row g-4 pt-3 border-top border-white border-opacity-20">
                <div className="col-4">
                  <h3 className="fw-extrabold text-info mb-0">15,000+</h3>
                  <small className="text-light opacity-75">Successful Placements</small>
                </div>
                <div className="col-4">
                  <h3 className="fw-extrabold text-info mb-0">500+</h3>
                  <small className="text-light opacity-75">Corporate Clients</small>
                </div>
                <div className="col-4">
                  <h3 className="fw-extrabold text-info mb-0">99.4%</h3>
                  <small className="text-light opacity-75">Client Satisfaction</small>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="col-lg-5 position-relative"
            >
              <div className="position-relative z-1">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"
                  alt="Corporate Executive Team"
                  className="img-fluid rounded-4 shadow-lg border border-white border-opacity-20"
                />

                <div className="position-absolute top-0 start-0 translate-middle-y bg-glass p-3 rounded-4 shadow-lg d-flex align-items-center gap-3 animate-floating">
                  <div className="rounded-circle bg-success bg-opacity-20 p-2 text-success">
                    <i className="bi bi-shield-check fs-4"></i>
                  </div>
                  <div>
                    <strong className="d-block text-dark small">Background Vetted</strong>
                    <small className="text-muted fs-7">100% Certified Personnel</small>
                  </div>
                </div>

                <div className="position-absolute bottom-0 end-0 translate-middle-y bg-dark-glass p-3 rounded-4 shadow-lg d-flex align-items-center gap-3 animate-floating" style={{ animationDelay: '2s' }}>
                  <div className="rounded-circle bg-info bg-opacity-20 p-2 text-info">
                    <i className="bi bi-clock-history fs-4"></i>
                  </div>
                  <div>
                    <strong className="d-block text-white small">Rapid Deployment</strong>
                    <small className="text-light opacity-75 fs-7">24-48 Hour Fulfillment</small>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE CLIENT LOGOS TICKER */}
      {/* {clients.length > 0 && (
        <section className="py-4 bg-white border-bottom shadow-sm">
          <div className="container">
            <p className="text-center text-muted small fw-bold tracking-wider text-uppercase mb-3">
              Trusted by Premier Institutions & Leading Corporate Enterprises
            </p>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 gap-md-5 opacity-75">
              {clients.map((client) => (
                <img
                  key={client._id}
                  src={client.logo}
                  alt={client.companyName}
                  className="img-fluid"
                  style={{ maxHeight: '42px', objectFit: 'contain', filter: 'grayscale(100%) opacity(0.7)' }}
                />
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* 3. ABOUT SUMMARY */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="Staffing Consultation"
                  className="img-fluid rounded-4 shadow-md"
                />
                <div className="position-absolute bottom-0 start-0 m-4 p-4 rounded-4 bg-navy-gradient text-white shadow-lg max-w-xs">
                  <h4 className="fw-bold mb-1">15+ Years</h4>
                  <p className="small mb-0 opacity-85">Of Excellence in Placement & Talent Acquisition Solutions.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">ABOUT JESSY GLOBAL</span>
              <h2 className="display-6 fw-bold text-navy mb-4">
                Connecting Outstanding Talent with Visionary Organizations
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Jessy Global Staffing & HR Solutions is a premier placement consultancy offering full-spectrum manpower management. From certified educators to licensed healthcare specialists and tactical asset security personnel, we deliver reliable staffing tailored to your precise operational needs.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-sm-6 d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-primary fs-5"></i>
                  <span className="fw-semibold text-dark">Strict Credential Verification</span>
                </div>
                <div className="col-sm-6 d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-primary fs-5"></i>
                  <span className="fw-semibold text-dark">Tailored HR & Payroll Outsourcing</span>
                </div>
                <div className="col-sm-6 d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-primary fs-5"></i>
                  <span className="fw-semibold text-dark">24/7 Clinical & Security Deployment</span>
                </div>
                <div className="col-sm-6 d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-primary fs-5"></i>
                  <span className="fw-semibold text-dark">100% Legal & Statutory Compliance</span>
                </div>
              </div>

              <Link to="/about" className="btn btn-outline-custom rounded-pill">
                Learn More About Us <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES OVERVIEW */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">OUR SERVICES</span>
            <h2 className="display-6 fw-bold text-navy">Comprehensive Staffing Divisions</h2>
            <p className="text-muted">Specialized workforce solutions managed dynamically through our platform.</p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="row g-4">
              {services.map((service) => (
                <div key={service._id} className="col-lg-4 col-md-6">
                  <div className="card-hover-lift h-100 p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="icon-box-primary">
                          <i className={`bi ${service.icon || 'bi-briefcase-fill'}`}></i>
                        </div>
                        <span className="badge bg-light text-muted border px-2 py-1 small">{service.category}</span>
                      </div>

                      <h4 className="fw-bold text-navy mb-2">{service.title}</h4>
                      <p className="text-muted small leading-relaxed mb-3">{service.shortDescription}</p>

                      {service.rolesProvided && service.rolesProvided.length > 0 && (
                        <div className="mb-3">
                          <small className="fw-bold text-dark d-block mb-1">Roles Provided:</small>
                          <div className="d-flex flex-wrap gap-1">
                            {service.rolesProvided.slice(0, 4).map((role, idx) => (
                              <span key={idx} className="badge bg-light text-primary border fs-8">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. MODERN TARGET INDUSTRIES SECTION */}
      <IndustriesSection />




      {/* 7. FEATURED CAREERS & JOBS HUB */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
            <div>
              <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">RECRUITMENT HUB</span>
              <h2 className="display-6 fw-bold text-navy mb-0">Open Career Opportunities</h2>
            </div>
            <Link to="/careers" className="btn btn-primary-custom rounded-pill px-4">
              View All Jobs & Search ({featuredJobs.length}) <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredJobs.map((job) => (
              <div key={job._id} className="col-lg-4 col-md-6">
                <JobCard job={job} onApply={(j) => setSelectedJobForApply(j)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SLIDER */}
      {testimonials.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container py-4">
            <div className="text-center max-w-2xl mx-auto mb-5">
              <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">CLIENT REVIEWS</span>
              <h2 className="display-6 fw-bold text-navy">Trusted by Industry Leaders</h2>
            </div>

            <div className="row g-4">
              {testimonials.map((test) => (
                <div key={test._id} className="col-lg-4 col-md-6">
                  <div className="card-hover-lift h-100 p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex gap-1 text-warning mb-3">
                        {[...Array(test.rating || 5)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill"></i>
                        ))}
                      </div>
                      <p className="text-muted fst-italic small leading-relaxed mb-4">
                        "{test.review}"
                      </p>
                    </div>

                    <div className="d-flex align-items-center gap-3 pt-3 border-top">
                      {test.photo ? (
                        <img src={test.photo} alt={test.name} className="rounded-circle object-fit-cover" style={{ width: '48px', height: '48px' }} />
                      ) : (
                        <div className="rounded-circle bg-navy-gradient text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px' }}>
                          {test.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h6 className="fw-bold text-navy mb-0">{test.name}</h6>
                        <small className="text-muted d-block fs-7">{test.designation} &bull; {test.company}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CONTACT CTA */}
      <section className="py-5 bg-navy-gradient text-white text-center">
        <div className="container py-4">
          <h2 className="display-5 fw-extrabold text-white mb-3">Need Customized Staffing Solutions?</h2>
          <p className="lead text-light opacity-90 max-w-2xl mx-auto mb-4">
            Connect directly with our HR recruitment team to request tailored talent or discuss executive placements.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/contact" className="btn btn-primary-custom btn-lg rounded-pill px-5 py-3">
              Get In Touch Now
            </Link>
          </div>
        </div>
      </section>

      {/* APPLICATION MODAL */}
      {selectedJobForApply && (
        <ApplyModal job={selectedJobForApply} onClose={() => setSelectedJobForApply(null)} />
      )}


    </div>
  );
};

export default Home;
