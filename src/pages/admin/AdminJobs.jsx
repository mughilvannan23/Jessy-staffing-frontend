import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const DEFAULT_CATEGORIES = ['School Staffing', 'Security Staffing', 'Healthcare Staffing', 'Home Care', 'Corporate Staffing', 'HR Outsourcing'];
  
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  const availableCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...jobs.map(j => j.category).filter(Boolean)
    ])
  );

  // Form State
  const [formData, setFormData] = useState({
    jobTitle: '',
    category: 'School Staffing',
    department: '',
    location: '',
    employmentType: 'Full-Time',
    experience: '2-5 Years',
    salary: '',
    vacancies: 1,
    qualification: '',
    skills: '',
    description: '',
    responsibilities: '',
    benefits: '',
    genderPreference: 'Any',
    ageLimit: '20 - 45 Years',
    workingHours: '8 Hours / Shift',
    status: 'published',
    isFeatured: false,
    companyName: 'Jessy Global Staffing'
  });
  const [companyImageFile, setCompanyImageFile] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get('/jobs/admin/all');
      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (err) {
      console.error('Error fetching admin jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({
      jobTitle: '',
      category: 'School Staffing',
      department: 'Academic Operations',
      location: 'New York, NY',
      employmentType: 'Full-Time',
      experience: '2-5 Years',
      salary: '$60,000 - $75,000 / year',
      vacancies: 2,
      qualification: 'Bachelor / Master Degree',
      skills: 'Recruitment, Communication, Compliance',
      description: 'Detailed description of candidate requirements and goals...',
      responsibilities: 'Deliver engaging instructions\nMaintain daily reporting',
      benefits: 'Full Health Coverage\nPaid Time Off',
      genderPreference: 'Any',
      ageLimit: '20 - 45 Years',
      workingHours: '8 Hours / Shift',
      status: 'published',
      isFeatured: false,
      companyName: 'Jessy Global Staffing'
    });
    setCompanyImageFile(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (job) => {
    setEditingJob(job);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setFormData({
      jobTitle: job.jobTitle || '',
      category: job.category || 'School Staffing',
      department: job.department || '',
      location: job.location || '',
      employmentType: job.employmentType || 'Full-Time',
      experience: job.experience || '',
      salary: job.salary || '',
      vacancies: job.vacancies || 1,
      qualification: job.qualification || '',
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '',
      description: job.description || '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : job.responsibilities || '',
      benefits: Array.isArray(job.benefits) ? job.benefits.join('\n') : job.benefits || '',
      genderPreference: job.genderPreference || 'Any',
      ageLimit: job.ageLimit || '20 - 45 Years',
      workingHours: job.workingHours || '8 Hours / Shift',
      status: job.status || 'published',
      isFeatured: job.isFeatured || false,
      companyName: job.companyName || 'Jessy Global Staffing'
    });
    setCompanyImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (companyImageFile) {
        data.append('companyImageFile', companyImageFile);
      }

      let res;
      if (editingJob) {
        res = await API.put(`/jobs/${editingJob._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await API.post('/jobs', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (res.data.success) {
        setMsg({ type: 'success', text: res.data.message });
        setShowModal(false);
        fetchJobs();
      }
    } catch (err) {
      setMsg({ type: 'danger', text: err.message || 'Error saving job details' });
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        const res = await API.delete(`/jobs/${id}`);
        if (res.data.success) {
          fetchJobs();
        }
      } catch (err) {
        alert(err.message || 'Failed to delete job');
      }
    }
  };

  const handleToggleStatus = async (job, newStatus) => {
    try {
      await API.put(`/jobs/${job._id}`, { status: newStatus });
      fetchJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleFeatured = async (job) => {
    try {
      await API.put(`/jobs/${job._id}`, { isFeatured: !job.isFeatured });
      fetchJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <main className="admin-content flex-grow-1">
        <AdminHeader title="Manage Recruitment Jobs" />

        {msg.text && (
          <div className={`alert alert-${msg.type} py-2 px-3 small rounded-3 mb-4`}>
            {msg.text}
          </div>
        )}

        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold text-navy mb-0">Active Job Postings ({jobs.length})</h5>
            <button onClick={handleOpenCreateModal} className="btn btn-primary-custom rounded-pill">
              <i className="bi bi-plus-circle-fill me-1"></i> Post New Job Opening
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Job Title</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Type & Experience</th>
                    <th>Salary</th>
                    <th>Vacancies</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j) => (
                    <tr key={j._id}>
                      <td>
                        <strong className="d-block text-dark">{j.jobTitle}</strong>
                        <small className="text-muted">{j.companyName}</small>
                      </td>
                      <td>
                        <span className="badge bg-light text-primary border">{j.category}</span>
                      </td>
                      <td>{j.location}</td>
                      <td>
                        <small className="d-block fw-semibold">{j.employmentType}</small>
                        <small className="text-muted">{j.experience}</small>
                      </td>
                      <td><span className="fw-bold text-primary">{j.salary}</span></td>
                      <td><span className="badge bg-secondary">{j.vacancies}</span></td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={j.status}
                          onChange={(e) => handleToggleStatus(j, e.target.value)}
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleFeatured(j)}
                          className={`btn btn-sm ${j.isFeatured ? 'btn-warning text-dark' : 'btn-outline-secondary'}`}
                        >
                          <i className={`bi bi-star${j.isFeatured ? '-fill' : ''}`}></i>
                        </button>
                      </td>
                      <td className="text-end">
                        <button onClick={() => handleOpenEditModal(j)} className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button onClick={() => handleDeleteJob(j._id)} className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* MODAL FOR JOB CREATION & EDITING */}
        {showModal && (
          <div className="modal fade show d-block bg-dark bg-opacity-50" tabIndex="-1" style={{ backdropFilter: 'blur(4px)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-navy-gradient text-white p-4">
                  <h5 className="modal-title fw-bold text-white">
                    {editingJob ? 'Edit Job Posting' : 'Create New Job Opening'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Job Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Category *</label>
                      <select
                        className="form-select"
                        value={isCustomCategory ? 'CUSTOM_OPTION' : formData.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'CUSTOM_OPTION') {
                            setIsCustomCategory(true);
                            setCustomCategoryInput('');
                            setFormData({ ...formData, category: '' });
                          } else {
                            setIsCustomCategory(false);
                            setFormData({ ...formData, category: val });
                          }
                        }}
                      >
                        {availableCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="CUSTOM_OPTION">+ Add Custom Category...</option>
                      </select>

                      {isCustomCategory && (
                        <div className="input-group mt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type custom category name..."
                            value={customCategoryInput}
                            onChange={(e) => {
                              setCustomCategoryInput(e.target.value);
                              setFormData({ ...formData, category: e.target.value });
                            }}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => {
                              setIsCustomCategory(false);
                              setFormData({ ...formData, category: availableCategories[0] || 'School Staffing' });
                            }}
                            title="Cancel Custom Category"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Location *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Employment Type</label>
                      <select
                        className="form-select"
                        value={formData.employmentType}
                        onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Permanent">Permanent</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Experience Mandate</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Salary Package *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-muted">Vacancies Count</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.vacancies}
                        onChange={(e) => setFormData({ ...formData, vacancies: e.target.value })}
                      />
                    </div>

                    <div className="col-md-8">
                      <label className="form-label small fw-semibold text-muted">Qualification Mandate *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-muted">Skills (Comma Separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Calculus, STEM, Public Speaking"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-muted">Description *</label>
                      <textarea
                        rows="3"
                        className="form-control"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Responsibilities (Line Separated)</label>
                      <textarea
                        rows="3"
                        className="form-control"
                        value={formData.responsibilities}
                        onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Benefits & Perks (Line Separated)</label>
                      <textarea
                        rows="3"
                        className="form-control"
                        value={formData.benefits}
                        onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Company Logo / Image File</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setCompanyImageFile(e.target.files[0])}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Status</label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary-custom rounded-pill px-4">
                      Save Job Posting
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminJobs;
