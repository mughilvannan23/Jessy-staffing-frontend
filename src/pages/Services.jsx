import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import Loader from '../components/Loader';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get('/services');
        if (res.data.success) {
          setServices(res.data.services);
        }
      } catch (err) {
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="services-page pt-5">
      <Breadcrumbs title="Our Staffing Solutions" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">EXECUTIVE DIVISIONS</span>
            <h1 className="display-5 fw-extrabold text-navy">Specialized Industry Staffing</h1>
            <p className="text-muted">
              We deliver vetted personnel, substitute talent, and full HR outsourcing across key economic sectors.
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="row g-4">
              {services.map((service) => (
                <div key={service._id} className="col-lg-4 col-md-6">
                  <div className="card-hover-lift h-100 overflow-hidden d-flex flex-column justify-content-between">
                    <div>
                      {service.image && (
                        <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                          <img src={service.image} alt={service.title} className="w-100 h-100 object-fit-cover" />
                          <span className="position-absolute top-0 end-0 m-3 badge bg-navy-gradient text-white rounded-pill px-3 py-2">
                            {service.category}
                          </span>
                        </div>
                      )}

                      <div className="p-4">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div className="icon-box-primary">
                            <i className={`bi ${service.icon || 'bi-briefcase-fill'}`}></i>
                          </div>
                          <h4 className="fw-bold text-navy mb-0">{service.title}</h4>
                        </div>

                        <p className="text-muted small leading-relaxed mb-3">
                          {service.shortDescription}
                        </p>

                        {service.features && service.features.length > 0 && (
                          <ul className="list-unstyled small text-muted mb-4 d-flex flex-column gap-2">
                            {service.features.slice(0, 3).map((feat, i) => (
                              <li key={i} className="d-flex align-items-center gap-2">
                                <i className="bi bi-check2-circle text-primary fw-bold"></i>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <Link to={`/services/${service.slug}`} className="btn btn-outline-custom w-100 rounded-pill">
                        Explore {service.title} <i className="bi bi-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
