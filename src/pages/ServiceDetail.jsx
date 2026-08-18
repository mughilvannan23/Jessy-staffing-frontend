import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import Loader from '../components/Loader';

const ServiceDetail = () => {
  const { identifier } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/services/${identifier}`);
        if (res.data.success) {
          setService(res.data.service);
        }
      } catch (err) {
        setError('Service details could not be found.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [identifier]);

  if (loading) return <div className="pt-5"><Loader /></div>;
  if (error || !service) {
    return (
      <div className="container text-center py-5 my-5">
        <h3 className="text-navy font-bold">Service Not Found</h3>
        <p className="text-muted mb-4">{error || 'The requested staffing division does not exist.'}</p>
        <Link to="/services" className="btn btn-primary-custom rounded-pill">Back to All Services</Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page pt-5">
      <Breadcrumbs title={service.title} parent="Services" parentUrl="/services" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              {service.image && (
                <div className="rounded-4 overflow-hidden mb-4 shadow-sm" style={{ maxHeight: '420px' }}>
                  <img src={service.image} alt={service.title} className="w-100 h-100 object-fit-cover" />
                </div>
              )}

              <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">
                {service.category} DIVISION
              </span>
              <h1 className="display-5 fw-bold text-navy mb-4">{service.title}</h1>

              <div className="lead text-muted mb-4 leading-relaxed">
                {service.shortDescription}
              </div>

              <div className="prose mb-5">
                <h4 className="fw-bold text-navy mb-3">Overview & Operational Model</h4>
                <p className="text-muted leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="p-4 rounded-4 bg-light mb-5">
                  <h4 className="fw-bold text-navy mb-3">Key Differentiators & Standards</h4>
                  <div className="row g-3">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="col-md-6 d-flex align-items-center gap-2">
                        <i className="bi bi-shield-check text-primary fs-5"></i>
                        <span className="fw-semibold text-dark">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.rolesProvided && service.rolesProvided.length > 0 && (
                <div className="mb-5">
                  <h4 className="fw-bold text-navy mb-3">Personnel & Roles Deployed</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {service.rolesProvided.map((role, idx) => (
                      <span key={idx} className="badge bg-navy-gradient text-white fs-6 px-3 py-2 rounded-pill">
                        <i className="bi bi-person-check-fill me-1"></i> {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-4">
              <div className="card-hover-lift p-4 rounded-4 bg-light position-sticky" style={{ top: '100px' }}>
                <h4 className="fw-bold text-navy mb-3">Request Staffing Proposal</h4>
                <p className="small text-muted mb-4">
                  Need certified personnel for your institution or company? Speak directly with our industry director.
                </p>

                <div className="d-flex flex-column gap-3 mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 text-primary">
                      <i className="bi bi-telephone-fill fs-5"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">Direct Line</small>
                      <strong className="text-navy">+1 (800) 555-2739</strong>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 text-primary">
                      <i className="bi bi-envelope-fill fs-5"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">Official Email</small>
                      <strong className="text-navy">staffing@apexstaffing.com</strong>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="btn btn-primary-custom w-100 rounded-pill py-3">
                  Submit Staffing Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
