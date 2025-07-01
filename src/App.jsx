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