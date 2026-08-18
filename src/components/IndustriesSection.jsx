import React from 'react';
import { Container, Badge } from 'react-bootstrap';
import './industriesSection.css';

// 12 Target Industries Data
const industriesData = [
  { id: 1, name: 'IT', subtitle: 'Software, Cloud & AI Solutions', icon: 'bi-laptop-fill' },
  { id: 2, name: 'Real Estate', subtitle: 'Commercial & Residential Towers', icon: 'bi-building-fill-gear' },
  { id: 3, name: 'Banking', subtitle: 'Financial Services & Fintech', icon: 'bi-bank2' },
  { id: 4, name: 'Advertising', subtitle: 'Media & Digital Marketing', icon: 'bi-megaphone-fill' },
  { id: 5, name: 'E-commerce', subtitle: 'Online Retail & Supply Chain', icon: 'bi-cart-check-fill' },
  { id: 6, name: 'Automobile', subtitle: 'EV & Automotive Manufacturing', icon: 'bi-car-front-fill' },
  { id: 7, name: 'Retail', subtitle: 'Consumer Stores & Merchandising', icon: 'bi-shop-window' },
  { id: 8, name: 'Telecommunication', subtitle: '5G Networks & Telecom Infrastructure', icon: 'bi-broadcast-pin' },
  { id: 9, name: 'Education', subtitle: 'K-12 Schools & Higher Academics', icon: 'bi-mortarboard-fill' },
  { id: 10, name: 'Energy', subtitle: 'Renewable Energy & Power Utilities', icon: 'bi-lightning-charge-fill' },
  { id: 11, name: 'FMCG', subtitle: 'Fast Moving Consumer Goods', icon: 'bi-box-seam-fill' },
  { id: 12, name: 'Mining & Metal', subtitle: 'Heavy Extraction & Metallurgy', icon: 'bi-hammer' }
];

// Duplicate items to ensure seamless infinite looping track
const marqueeItems = [...industriesData, ...industriesData];

const IndustriesSection = () => {
  return (
    <section className="industries-section position-relative">
      {/* Background Animated Ambient Glowing Orbs */}
      <div className="industries-bg-orb industries-bg-orb-1"></div>
      <div className="industries-bg-orb industries-bg-orb-2"></div>

      <Container className="position-relative z-1 mb-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <Badge className="industries-badge rounded-pill mb-3">
            TARGET INDUSTRIES
          </Badge>
          <h2 className="industries-title">Industries We Cater</h2>
          <p className="industries-subtitle">
            We provide B2B recruitment and staffing solutions across multiple industries with skilled professionals.
          </p>
        </div>
      </Container>

      {/* Continuous Infinite Right-to-Left Ticker Track */}
      <div className="industries-marquee-container">
        <div className="industries-marquee-track">
          {marqueeItems.map((item, index) => (
            <div className="industry-card-item" key={`${item.id}-${index}`}>
              <div className="industry-card-glass">
                {/* Floating Icon Wrapper */}
                <div className="industry-icon-wrapper">
                  <i className={`bi ${item.icon}`}></i>
                </div>

                {/* Card Text Content */}
                <h3 className="industry-card-name">{item.name}</h3>
                <p className="industry-card-subtitle">{item.subtitle}</p>

                {/* Bottom Glow Indicator */}
                <div className="industry-card-indicator"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
