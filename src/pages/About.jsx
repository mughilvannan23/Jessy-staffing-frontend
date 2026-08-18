import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const About = () => {
  return (
    <div className="about-page pt-navbar">
      <Breadcrumbs title="About Our Company" />

      {/* OVERVIEW HERO */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">CORPORATE OVERVIEW</span>
              <h1 className="display-5 fw-extrabold text-navy mb-4">
                Pioneering Premium Workforce & HR Outsourcing Globally
              </h1>
              <p className="text-muted leading-relaxed mb-3">
                Founded with a mission to deliver elite talent acquisition and institutional staffing services, Apex Global Staffing & HR Solutions stands as a trusted strategic human capital partner to multi-national corporations, healthcare networks, premier private schools, and high-security infrastructure.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                We operate across specialized divisions—School Staffing, Healthcare Clinical Placement, Industrial & Asset Security, In-Home Care, and Corporate Talent Headhunting—ensuring every placed candidate adheres to rigorous compliance, credentialing, and ethical standards.
              </p>

              <div className="p-4 rounded-4 bg-light border-start border-4 border-primary mb-4">
                <p className="fst-italic text-dark mb-0 fw-medium">
                  "Our mandate is simple: to empower organizations with high-performing, verified professionals while handling full statutory compliance, background screening, and payroll operations."
                </p>
                <small className="text-muted fw-bold d-block mt-2">— Executive Leadership Board</small>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
                alt="About Apex Global HR"
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION, VISION & VALUES */}
      <section className="py-5 bg-light" id="mission">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">FOUNDATIONAL PILLARS</span>
            <h2 className="display-6 fw-bold text-navy">Mission, Vision & Core Values</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card-hover-lift h-100 p-4 text-center">
                <div className="icon-box-primary mx-auto mb-3">
                  <i className="bi bi-compass-fill"></i>
                </div>
                <h4 className="fw-bold text-navy mb-2">Our Mission</h4>
                <p className="text-muted small leading-relaxed">
                  To provide seamless, ethical, and high-precision staffing solutions that drive client operational excellence while empowering job seekers with fulfilling career opportunities.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-hover-lift h-100 p-4 text-center">
                <div className="icon-box-primary mx-auto mb-3">
                  <i className="bi bi-eye-fill"></i>
                </div>
                <h4 className="fw-bold text-navy mb-2">Our Vision</h4>
                <p className="text-muted small leading-relaxed">
                  To remain the premier benchmark in global HR outsourcing, recognized for uncompromising compliance, rapid deployment capabilities, and client-first relationship management.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-hover-lift h-100 p-4 text-center">
                <div className="icon-box-primary mx-auto mb-3">
                  <i className="bi bi-gem"></i>
                </div>
                <h4 className="fw-bold text-navy mb-2">Core Values</h4>
                <p className="text-muted small leading-relaxed">
                  Integrity, Absolute Compliance, Rapid Responsiveness, Dignity in Care, and Unwavering Commitment to Quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE TEAM */}
      <section className="py-5 bg-white" id="team">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">LEADERSHIP BOARD</span>
            <h2 className="display-6 fw-bold text-navy">Meet Our Executive Leadership</h2>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card-hover-lift text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
                  alt="CEO"
                  className="rounded-circle img-fluid mb-3 mx-auto object-fit-cover"
                  style={{ width: '130px', height: '130px' }}
                />
                <h5 className="fw-bold text-navy mb-1">Marcus Sterling</h5>
                <small className="text-primary fw-semibold d-block mb-2">Chief Executive Officer</small>
                <p className="text-muted small">Ex-Fortune 500 HR Director with 20+ years steering international staffing networks.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card-hover-lift text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                  alt="VP Healthcare"
                  className="rounded-circle img-fluid mb-3 mx-auto object-fit-cover"
                  style={{ width: '130px', height: '130px' }}
                />
                <h5 className="fw-bold text-navy mb-1">Dr. Victoria Thorne</h5>
                <small className="text-primary fw-semibold d-block mb-2">VP Healthcare & Clinical</small>
                <p className="text-muted small">Former Hospital Administrator overseeing nurse accreditation & clinical staffing.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card-hover-lift text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
                  alt="Director Security"
                  className="rounded-circle img-fluid mb-3 mx-auto object-fit-cover"
                  style={{ width: '130px', height: '130px' }}
                />
                <h5 className="fw-bold text-navy mb-1">Col. Raymond Vance</h5>
                <small className="text-primary fw-semibold d-block mb-2">Director of Asset Security</small>
                <p className="text-muted small">Military veteran leading tactical guard training and emergency response teams.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card-hover-lift text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
                  alt="Head of Education Staffing"
                  className="rounded-circle img-fluid mb-3 mx-auto object-fit-cover"
                  style={{ width: '130px', height: '130px' }}
                />
                <h5 className="fw-bold text-navy mb-1">Hannah Montgomery</h5>
                <small className="text-primary fw-semibold d-block mb-2">Head of Academic Staffing</small>
                <p className="text-muted small">Specialist in international school placements and educator background verification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
