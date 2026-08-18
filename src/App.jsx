import React, { useContext } from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthContext } from './context/AuthContext';

// Layout & Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import CookieConsent from './components/CookieConsent';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import ContactPage from './pages/ContactPage';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminJobs from './pages/admin/AdminJobs';
import AdminApplications from './pages/admin/AdminApplications';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminClients from './pages/admin/AdminClients';
import AdminContactEnquiries from './pages/admin/AdminContactEnquiries';
import AdminProfile from './pages/admin/AdminProfile';

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useContext(AuthContext);

  if (!admin || !admin.token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="app-container d-flex flex-column min-vh-100">

        <Navbar />

        <div className="flex-grow-1">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<JobDetail />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Registration */}
            <Route path="/register" element={<Registration />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/employee-registration" element={<Registration />} />
            <Route path="/employer-registration" element={<Registration />} />

            {/* Graceful Redirects */}
            <Route
              path="/services"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/industries"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/gallery"
              element={<Navigate to="/" replace />}
            />

            {/* Admin Login */}
            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/jobs"
              element={
                <ProtectedAdminRoute>
                  <AdminJobs />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/applications"
              element={
                <ProtectedAdminRoute>
                  <AdminApplications />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/testimonials"
              element={
                <ProtectedAdminRoute>
                  <AdminTestimonials />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/clients"
              element={
                <ProtectedAdminRoute>
                  <AdminClients />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/enquiries"
              element={
                <ProtectedAdminRoute>
                  <AdminContactEnquiries />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/profile"
              element={
                <ProtectedAdminRoute>
                  <AdminProfile />
                </ProtectedAdminRoute>
              }
            />

            {/* Admin Redirects */}
            <Route
              path="/admin/services"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            <Route
              path="/admin/gallery"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            <Route
              path="/admin/settings"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            {/* 404 */}
            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </div>

        <Footer />
        <FloatingActions />
        <CookieConsent />

      </div>
  );
};

export default App;