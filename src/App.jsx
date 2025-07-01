import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import JobsPage from '@/components/pages/JobsPage';
import JobDetailPage from '@/components/pages/JobDetailPage';
import CompaniesPage from '@/components/pages/CompaniesPage';
import CompanyDetailPage from '@/components/pages/CompanyDetailPage';
import DashboardPage from '@/components/pages/DashboardPage';
import EmployerPage from '@/components/pages/EmployerPage';
import TestimonialsPage from '@/components/pages/TestimonialsPage';
import PartnersPage from '@/components/pages/PartnersPage';
import UploadCVPage from '@/components/pages/UploadCVPage';
import MissionVisionPage from '@/components/pages/MissionVisionPage';
import ContactPage from '@/components/pages/ContactPage';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<JobsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<CompanyDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employers" element={<EmployerPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/upload-cv" element={<UploadCVPage />} />
          <Route path="/mission-vision" element={<MissionVisionPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;