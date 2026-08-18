import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Industries = () => {
  const industrySectors = [
    {
      title: 'K-12 & Higher Academic Institutions',
      category: 'Education',
      icon: 'bi-mortarboard-fill',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
      description: 'Sourcing certified STEM educators, academic principals, lab assistants, sports coaches, and school administrative staff with full background checks.',
      serviceLink: '/services/school-staffing'
    },
    {
      title: 'Hospitals & Clinical Networks',
      category: 'Healthcare',
      icon: 'bi-hospital-fill',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      description: 'Deploying accredited RNs, ICU specialists, lab technicians, and hospital administrative leads for shift coverage and permanent placement.',
      serviceLink: '/services/healthcare-staffing'
    },
    {
      title: 'Financial Services & Corporate Towers',
      category: 'Corporate',
      icon: 'bi-building-fill-gear',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      description: 'Executive placement for HR managers, financial controllers, software engineers, and administrative teams tailored to high-growth organizations.',
      serviceLink: '/services/corporate-staffing'
    },
    {
      title: 'Industrial Assets & Commercial Facilities',
      category: 'Security',
      icon: 'bi-shield-lock-fill',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop',
      description: 'Comprehensive physical security guards, CCTV command operators, access control officers, and VIP event security teams.',
      serviceLink: '/services/security-services'
    },
    {
      title: 'Private Residences & Elderly Care',
      category: 'Home Care',
      icon: 'bi-heart-pulse-fill',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop',
      description: 'Dignified in-home nursing, post-operative care, elderly assistance, baby care aides, and executive personal assistants.',
      serviceLink: '/services/home-care-assistance'
    }
  ];

  return (
    <div className="industries-page pt-5">
      <Breadcrumbs title="Industries We Serve" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">SECTOR COVERAGE</span>
            <h1 className="display-5 fw-extrabold text-navy">Tailored Industry Workforce Solutions</h1>
            <p className="text-muted">
              Deep domain expertise matching specialized talent to industry compliance standards.
            </p>
          </div>

          <div className="row g-4">
            {industrySectors.map((ind, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="card-hover-lift h-100 overflow-hidden d-flex flex-column justify-content-between">
                  <div>
                    <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                      <img src={ind.image} alt={ind.title} className="w-100 h-100 object-fit-cover" />
                      <span className="position-absolute top-0 end-0 m-3 badge bg-navy-gradient text-white rounded-pill px-3 py-2">
                        {ind.category}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="icon-box-primary">
                          <i className={`bi ${ind.icon}`}></i>
                        </div>
                        <h4 className="fw-bold text-navy mb-0 fs-5">{ind.title}</h4>
                      </div>

                      <p className="text-muted small leading-relaxed mt-3">
                        {ind.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link to={ind.serviceLink} className="btn btn-outline-custom w-100 rounded-pill">
                      Explore {ind.category} Services
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
