import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';
import Loader from '../components/Loader';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);

  // Filters State
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [employmentType, setEmploymentType] = useState('All');
  const [experience, setExperience] = useState('All');
  const DEFAULT_CATEGORIES = ['School Staffing', 'Security Staffing', 'Healthcare Staffing', 'Home Care', 'Corporate Staffing', 'HR Outsourcing'];
  const categoryOptions = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...jobs.map(j => j.category).filter(Boolean)
    ])
  );

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (category !== 'All') params.append('category', category);
      if (locationFilter !== 'All') params.append('location', locationFilter);
      if (employmentType !== 'All') params.append('employmentType', employmentType);
      if (experience !== 'All') params.append('experience', experience);

      const res = await API.get(`/jobs?${params.toString()}`);
      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category, locationFilter, employmentType, experience]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleResetFilters = () => {
    setKeyword('');
    setCategory('All');
    setLocationFilter('All');
    setEmploymentType('All');
    setExperience('All');
  };

  return (
    <div className="careers-page pt-navbar">
      <Breadcrumbs title="Career Openings" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">JOIN OUR TALENT BENCH</span>
            <h1 className="display-5 fw-extrabold text-navy">Explore Premium Opportunities</h1>
            <p className="text-muted">
              Search open positions across top international schools, healthcare facilities, corporate enterprises, and security teams.
            </p>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="p-4 rounded-4 bg-light shadow-sm border mb-5">
            <form onSubmit={handleSearchSubmit}>
              <div className="row g-3">
                <div className="col-lg-4 col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 ps-0"
                      placeholder="Job title, skill, or keyword..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-2 col-md-6">
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-2 col-md-6">
                  <select
                    className="form-select"
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                  >
                    <option value="All">All Job Types</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Permanent">Permanent</option>
                  </select>
                </div>

                <div className="col-lg-2 col-md-6">
                  <select
                    className="form-select"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="All">All Experience</option>
                    <option value="Freshers">Freshers</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="2-4 Years">2-4 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>

                <div className="col-lg-2 col-md-12 d-flex gap-2">
                  <button type="submit" className="btn btn-primary-custom w-100 rounded-3">
                    Search
                  </button>
                  <button type="button" onClick={handleResetFilters} className="btn btn-outline-secondary rounded-3" title="Reset Filters">
                    <i className="bi bi-arrow-counterclockwise"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* JOBS GRID */}
          {loading ? (
            <Loader />
          ) : jobs.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-briefcase text-muted display-3 d-block mb-3"></i>
              <h4 className="fw-bold text-navy">No Job Postings Match Your Search</h4>
              <p className="text-muted">Try adjusting your category or keyword filters to find open opportunities.</p>
              <button onClick={handleResetFilters} className="btn btn-outline-custom rounded-pill mt-2">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {jobs.map((job) => (
                <div key={job._id} className="col-lg-4 col-md-6">
                  <JobCard job={job} onApply={(j) => setSelectedJobForApply(j)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CANDIDATE APPLY MODAL */}
      {selectedJobForApply && (
        <ApplyModal job={selectedJobForApply} onClose={() => setSelectedJobForApply(null)} />
      )}
    </div>
  );
};

export default Careers;
