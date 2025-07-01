import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import JobCard from '@/components/molecules/JobCard';
import ApplicationCard from '@/components/molecules/ApplicationCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { jobService } from '@/services/api/jobService';
import { applicationService } from '@/services/api/applicationService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [savedJobsData, setSavedJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const tabs = [
    { id: 'applications', label: 'My Applications', icon: 'Send', count: applications.length },
    { id: 'saved', label: 'Saved Jobs', icon: 'Heart', count: savedJobs.length },
    { id: 'profile', label: 'Profile', icon: 'User', count: null },
  ];
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [applicationsData, allJobs] = await Promise.all([
        applicationService.getAll(),
        jobService.getAll()
      ]);
      
      // Filter applications for current user (mock user ID)
      const userApplications = applicationsData.filter(app => app.candidateId === 'user-1');
      setApplications(userApplications);
      
      // Load saved jobs from localStorage
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      setSavedJobs(savedJobIds);
      
      // Get full job data for saved jobs
      const savedJobsDetails = allJobs.filter(job => savedJobIds.includes(job.Id));
      setSavedJobsData(savedJobsDetails);
      
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };
  
  const handleWithdrawApplication = async (applicationId) => {
    try {
      await applicationService.delete(applicationId);
      setApplications(prev => prev.filter(app => app.Id !== applicationId));
      toast.success('Application withdrawn successfully');
    } catch (error) {
      toast.error('Failed to withdraw application');
    }
  };
  
  const handleRemoveSavedJob = (jobId) => {
    const updatedSaved = savedJobs.filter(id => id !== jobId);
    setSavedJobs(updatedSaved);
    setSavedJobsData(prev => prev.filter(job => job.Id !== jobId));
    localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
    toast.info('Job removed from saved jobs');
  };
  
  const getApplicationStats = () => {
    const stats = {
      total: applications.length,
      submitted: applications.filter(app => app.status === 'submitted').length,
      viewed: applications.filter(app => app.status === 'viewed').length,
      interview: applications.filter(app => app.status === 'interview').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      accepted: applications.filter(app => app.status === 'accepted').length,
    };
    return stats;
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;
  
  const stats = getApplicationStats();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold font-display gradient-text mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Track your applications and manage your job search
          </p>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card-premium p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Send" className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Eye" className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.viewed}</div>
            <div className="text-sm text-gray-600">Viewed</div>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Calendar" className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.interview}</div>
            <div className="text-sm text-gray-600">Interviews</div>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.accepted}</div>
            <div className="text-sm text-gray-600">Accepted</div>
          </div>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div
          className="border-b border-gray-200 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-5 h-5 mr-2" />
                {tab.label}
                {tab.count !== null && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </motion.div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'applications' && (
            <div>
              {applications.length > 0 ? (
                <div className="space-y-6">
                  {applications.map((application) => (
                    <ApplicationCard
                      key={application.Id}
                      application={application}
                      onViewJob={handleViewJob}
                      onWithdraw={handleWithdrawApplication}
                    />
                  ))}
                </div>
              ) : (
                <Empty
                  icon="Send"
                  title="No applications yet"
                  description="Start applying to jobs to see your applications here."
                  actionText="Browse Jobs"
                  onAction={() => navigate('/jobs')}
                />
              )}
            </div>
          )}
          
          {activeTab === 'saved' && (
            <div>
              {savedJobsData.length > 0 ? (
                <div className="space-y-6">
                  {savedJobsData.map((job) => (
                    <JobCard
                      key={job.Id}
                      job={job}
                      onSaveJob={handleRemoveSavedJob}
                      isSaved={true}
                    />
                  ))}
                </div>
              ) : (
                <Empty
                  icon="Heart"
                  title="No saved jobs"
                  description="Save interesting jobs to easily find them later."
                  actionText="Explore Jobs"
                  onAction={() => navigate('/jobs')}
                />
              )}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="card-premium p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="User" className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Management</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Profile management features would be implemented here, including personal information, resume upload, and preferences.
              </p>
              <Button variant="outline" icon="Settings">
                Manage Profile
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;