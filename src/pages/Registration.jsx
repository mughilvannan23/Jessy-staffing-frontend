import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import API from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import './registration.css';

const Registration = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('employee');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');

    if (typeParam === 'employer' || location.pathname.includes('employer')) {
      setActiveTab('employer');
    } else if (typeParam === 'employee' || location.pathname.includes('employee')) {
      setActiveTab('employee');
    }
  }, [location]);


  // Employee Form State
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    dob: '',
    specialisation: '',
    qualificationLevel: '',
    preferredContract: '',
    linkedIn: '',
    resume: null,
    privacyConsent: false
  });

  // Employer Form State
  const [employerData, setEmployerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    message: '',
    commConsent: false
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Handle Employee Form Changes
  const handleEmployeeChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setEmployeeData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setEmployeeData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setEmployeeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Employer Form Changes
  const handleEmployerChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEmployerData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setEmployerData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('type', activeTab);

      if (activeTab === 'employee') {
        if (!employeeData.privacyConsent) {
          setStatusMsg({ type: 'danger', text: 'Please accept the Privacy Policy to proceed.' });
          setLoading(false);
          return;
        }

        formData.append('firstName', employeeData.firstName);
        formData.append('lastName', employeeData.lastName);
        formData.append('email', employeeData.email);
        formData.append('phone', employeeData.phone);
        formData.append('nationality', employeeData.nationality);
        formData.append('dob', employeeData.dob);
        formData.append('specialisation', employeeData.specialisation);
        formData.append('qualificationLevel', employeeData.qualificationLevel);
        formData.append('preferredContract', employeeData.preferredContract);
        formData.append('linkedIn', employeeData.linkedIn);
        formData.append('consent', employeeData.privacyConsent);

        if (employeeData.resume) {
          formData.append('resume', employeeData.resume);
        }
      } else {
        if (!employerData.commConsent) {
          setStatusMsg({ type: 'danger', text: 'Please agree to communication consent to proceed.' });
          setLoading(false);
          return;
        }

        formData.append('firstName', employerData.firstName);
        formData.append('lastName', employerData.lastName);
        formData.append('email', employerData.email);
        formData.append('phone', employerData.phone);
        formData.append('company', employerData.company);
        formData.append('jobTitle', employerData.jobTitle);
        formData.append('message', employerData.message);
        formData.append('consent', employerData.commConsent);
      }

      const res = await API.post('/contact/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setStatusMsg({ type: 'success', text: res.data.message });

        // Reset state
        if (activeTab === 'employee') {
          setEmployeeData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            nationality: '',
            dob: '',
            specialisation: '',
            qualificationLevel: '',
            preferredContract: '',
            linkedIn: '',
            resume: null,
            privacyConsent: false
          });
          // Reset file input element if needed
          const fileInput = document.getElementById('resumeUploadInput');
          if (fileInput) fileInput.value = '';
        } else {
          setEmployerData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            jobTitle: '',
            message: '',
            commConsent: false
          });
        }
      }
    } catch (err) {
      setStatusMsg({
        type: 'danger',
        text: err.message || 'Submission failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page pt-navbar">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs title={activeTab === 'employee' ? 'Employee CV Registration' : 'Employer Proposal Request'} />

      {/* Hero Banner with Dark Overlay and Dynamic Title */}
      <section className="registration-hero">
        <Container>
          <h1 className="registration-hero-title">
            {activeTab === 'employee' ? 'REGISTER CV' : 'REQUEST PROPOSAL'}
          </h1>
          <p className="registration-hero-subtitle">
            {activeTab === 'employee'
              ? 'Join our global talent pool and get matched with top healthcare, educational, and corporate career opportunities.'
              : 'Partner with Jessy Global HR Solutions for custom recruitment, executive search, and workforce outsourcing services.'}
          </p>

          {/* Top Toggle Buttons */}
          {/* <div className="registration-toggle-wrapper">
            <button
              type="button"
              className={`registration-toggle-btn ${activeTab === 'employee' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('employee');
                setStatusMsg({ type: '', text: '' });
              }}
            >
              <i className="bi bi-person-badge-fill me-1"></i> Employee Registration
            </button>
            <button
              type="button"
              className={`registration-toggle-btn ${activeTab === 'employer' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('employer');
                setStatusMsg({ type: '', text: '' });
              }}
            >
              <i className="bi bi-building-check me-1"></i> Employer Registration
            </button>
          </div> */}
        </Container>
      </section>

      {/* Two Column Layout Section */}
      <Container className="my-5">
        <Row className="g-4 align-items-stretch">
          {/* Left Column: Form */}
          <Col xs={12} lg={7}>
            <Card className="registration-card border-0">
              <div className="mb-4">
                <h3 className="registration-card-title">
                  {activeTab === 'employee' ? 'Candidate Profile Registration' : 'Employer Solution Request'}
                </h3>
                <p className="registration-card-subtitle">
                  Please complete the form below. All fields marked with * are required.
                </p>
              </div>

              {statusMsg.text && (
                <Alert variant={statusMsg.type} dismissible onClose={() => setStatusMsg({ type: '', text: '' })}>
                  {statusMsg.text}
                </Alert>
              )}

              {/* Employee Registration Form */}
              {activeTab === 'employee' && (
                <Form onSubmit={handleSubmit} className="registration-form">
                  <Row className="g-3">
                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeFirstName">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={employeeData.firstName}
                          onChange={handleEmployeeChange}
                          placeholder="e.g. John"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeLastName">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={employeeData.lastName}
                          onChange={handleEmployeeChange}
                          placeholder="e.g. Doe"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeEmail">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={employeeData.email}
                          onChange={handleEmployeeChange}
                          placeholder="john.doe@example.com"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeePhone">
                        <Form.Label>Mobile Number *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={employeeData.phone}
                          onChange={handleEmployeeChange}
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeNationality">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control
                          type="text"
                          name="nationality"
                          value={employeeData.nationality}
                          onChange={handleEmployeeChange}
                          placeholder="e.g. British, American, Indian"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeDob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="dob"
                          value={employeeData.dob}
                          onChange={handleEmployeeChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeSpecialisation">
                        <Form.Label>Specialisation</Form.Label>
                        <Form.Control
                          type="text"
                          name="specialisation"
                          value={employeeData.specialisation}
                          onChange={handleEmployeeChange}
                          placeholder="e.g. Registered Nurse, Senior Developer"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeQualification">
                        <Form.Label>Qualification Level</Form.Label>
                        <Form.Control
                          type="text"
                          name="qualificationLevel"
                          value={employeeData.qualificationLevel}
                          onChange={handleEmployeeChange}
                          placeholder="e.g. Master's Degree, B.Sc Nursing"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeContract">
                        <Form.Label>Preferred Contract</Form.Label>
                        <Form.Select
                          name="preferredContract"
                          value={employeeData.preferredContract}
                          onChange={handleEmployeeChange}
                        >
                          <option value="">Select Contract Type...</option>
                          <option value="Full-Time">Full-Time Permanent</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Contract">Fixed-Term Contract</option>
                          <option value="Temporary">Temporary / Locum</option>
                          <option value="Freelance">Freelance / Remote</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employeeLinkedIn">
                        <Form.Label>LinkedIn Profile</Form.Label>
                        <Form.Control
                          type="url"
                          name="linkedIn"
                          value={employeeData.linkedIn}
                          onChange={handleEmployeeChange}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="resumeUploadInput">
                        <Form.Label>Upload CV (PDF, DOC, DOCX)</Form.Label>
                        <Form.Control
                          type="file"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleEmployeeChange}
                        />
                        <Form.Text className="text-muted small">
                          Max file size: 10MB. Formats accepted: PDF, DOC, DOCX.
                        </Form.Text>
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="employeeConsent">
                        <Form.Check
                          type="checkbox"
                          name="privacyConsent"
                          checked={employeeData.privacyConsent}
                          onChange={handleEmployeeChange}
                          label="I agree to the Privacy Policy and consent to Jessy HR storing my CV for employment matching purposes. *"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} className="mt-4">
                      <Button
                        type="submit"
                        className="btn-registration-submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" /> Submitting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-file-earmark-arrow-up-fill me-1"></i> Register CV
                          </>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}

              {/* Employer Registration Form */}
              {activeTab === 'employer' && (
                <Form onSubmit={handleSubmit} className="registration-form">
                  <Row className="g-3">
                    <Col xs={12} md={6}>
                      <Form.Group controlId="employerFirstName">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={employerData.firstName}
                          onChange={handleEmployerChange}
                          placeholder="e.g. Sarah"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employerLastName">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={employerData.lastName}
                          onChange={handleEmployerChange}
                          placeholder="e.g. Jenkins"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employerEmail">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={employerData.email}
                          onChange={handleEmployerChange}
                          placeholder="sarah.j@company.com"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employerPhone">
                        <Form.Label>Mobile Number *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={employerData.phone}
                          onChange={handleEmployerChange}
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employerCompany">
                        <Form.Label>Company Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="company"
                          value={employerData.company}
                          onChange={handleEmployerChange}
                          placeholder="e.g. Jessy Health Systems"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="employerJobTitle">
                        <Form.Label>Job Title *</Form.Label>
                        <Form.Control
                          type="text"
                          name="jobTitle"
                          value={employerData.jobTitle}
                          onChange={handleEmployerChange}
                          placeholder="e.g. HR Director / Hiring Manager"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="employerMessage">
                        <Form.Label>Message / Staffing Requirements</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="message"
                          value={employerData.message}
                          onChange={handleEmployerChange}
                          placeholder="Describe your staffing needs, contract preferences, or desired candidate qualifications..."
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="employerConsent">
                        <Form.Check
                          type="checkbox"
                          name="commConsent"
                          checked={employerData.commConsent}
                          onChange={handleEmployerChange}
                          label="I consent to Jessy HR Solutions contacting me regarding custom staffing proposals and executive recruitment options. *"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} className="mt-4">
                      <Button
                        type="submit"
                        className="btn-registration-submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" /> Submitting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send-fill me-1"></i> Submit
                          </>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Card>
          </Col>

          {/* Right Column: Image with Rounded Corners */}
          <Col xs={12} lg={5}>
            <div className="registration-image-wrapper">
              <img
                src={
                  activeTab === 'employee'
                    ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                    : 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop'
                }
                alt={activeTab === 'employee' ? 'Employee CV Registration' : 'Employer Staffing Solutions'}
                className="img-fluid"
              />
              <div className="registration-image-overlay">
                <h5 className="fw-bold mb-1">
                  {activeTab === 'employee' ? 'Accelerate Your Professional Career' : 'Scale Your Team With Verified Talent'}
                </h5>
                <p className="small mb-0 opacity-90">
                  {activeTab === 'employee'
                    ? 'Submit your credentials once and gain access to thousands of direct employer openings nationwide.'
                    : 'Tailored staffing, background screening, and statutory compliance managed end-to-end by our HR experts.'}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
