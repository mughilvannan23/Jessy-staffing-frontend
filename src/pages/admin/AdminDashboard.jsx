import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Loader from '../../components/Loader';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get('/dashboard/stats');
        if (res.data.success) {
          setStatsData(res.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444'];

  return (
    <div className="d-flex">
      <AdminSidebar />

      <main className="admin-content flex-grow-1">
        <AdminHeader title="Dashboard Overview & Metrics" />

        {loading || !statsData ? (
          <Loader />
        ) : (
          <div>
            {/* KPI STATS CARDS GRID */}
            <div className="row g-3 mb-4">
              <div className="col-xl-3 col-sm-6">
                <div className="card-hover-lift p-4 bg-white rounded-4 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small fw-bold">TOTAL JOBS</span>
                    <div className="rounded-3 bg-primary bg-opacity-10 p-2 text-primary">
                      <i className="bi bi-briefcase-fill fs-5"></i>
                    </div>
                  </div>
                  <h3 className="fw-extrabold text-navy mb-1">{statsData.stats.totalJobs}</h3>
                  <small className="text-success fw-semibold">
                    <i className="bi bi-check-circle me-1"></i> {statsData.stats.publishedJobs} Active Published
                  </small>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6">
                <div className="card-hover-lift p-4 bg-white rounded-4 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small fw-bold">APPLICATIONS</span>
                    <div className="rounded-3 bg-info bg-opacity-10 p-2 text-info">
                      <i className="bi bi-file-earmark-person fs-5"></i>
                    </div>
                  </div>
                  <h3 className="fw-extrabold text-navy mb-1">{statsData.stats.totalApplications}</h3>
                  <small className="text-warning fw-semibold">
                    <i className="bi bi-clock-history me-1"></i> {statsData.stats.pendingApplications} Pending Review
                  </small>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6">
                <div className="card-hover-lift p-4 bg-white rounded-4 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small fw-bold">PLACED CANDIDATES</span>
                    <div className="rounded-3 bg-success bg-opacity-10 p-2 text-success">
                      <i className="bi bi-person-check-fill fs-5"></i>
                    </div>
                  </div>
                  <h3 className="fw-extrabold text-navy mb-1">{statsData.stats.selectedCandidates}</h3>
                  <small className="text-muted">High Quality Hires</small>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6">
                <div className="card-hover-lift p-4 bg-white rounded-4 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small fw-bold">ENQUIRIES & IMPRESSIONS</span>
                    <div className="rounded-3 bg-danger bg-opacity-10 p-2 text-danger">
                      <i className="bi bi-envelope-open-fill fs-5"></i>
                    </div>
                  </div>
                  <h3 className="fw-extrabold text-navy mb-1">{statsData.stats.totalEnquiries}</h3>
                  <small className="text-danger fw-semibold">
                    <i className="bi bi-bell-fill me-1"></i> {statsData.stats.unreadEnquiries} Unread Messages
                  </small>
                </div>
              </div>
            </div>

            {/* RECHARTS CHARTS ROW */}
            <div className="row g-4 mb-4">
              <div className="col-lg-7">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                  <h5 className="fw-bold text-navy mb-4">Jobs Distribution By Industry Category</h5>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={statsData.categoryStats}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                        <YAxis stroke="#64748B" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#0B4F81" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
                  <h5 className="fw-bold text-navy mb-4">Candidate Application Pipeline Status</h5>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={statsData.applicationStatusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statsData.applicationStatusDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT APPLICATIONS TABLE */}
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-navy mb-0">Recent Candidate Applications</h5>
                <Link to="/admin/applications" className="btn btn-sm btn-outline-custom rounded-pill">
                  View All Applications
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small">
                    <tr>
                      <th>Candidate Name</th>
                      <th>Applied Job</th>
                      <th>Qualification</th>
                      <th>Experience</th>
                      <th>Status</th>
                      <th>Submitted Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statsData.recentApplications.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">No candidate applications recorded yet.</td>
                      </tr>
                    ) : (
                      statsData.recentApplications.map((app) => (
                        <tr key={app._id}>
                          <td>
                            <strong className="d-block text-dark">{app.name}</strong>
                            <small className="text-muted">{app.email}</small>
                          </td>
                          <td>{app.jobId ? app.jobId.jobTitle : 'N/A'}</td>
                          <td>{app.qualification}</td>
                          <td>{app.experience}</td>
                          <td>
                            <span className={`badge ${
                              app.status === 'selected' ? 'badge-soft-success' :
                              app.status === 'rejected' ? 'badge-soft-danger' :
                              app.status === 'reviewed' ? 'badge-soft-primary' : 'badge-soft-warning'
                            } px-2 py-1`}>
                              {app.status}
                            </span>
                          </td>
                          <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
