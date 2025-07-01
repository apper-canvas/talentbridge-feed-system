import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import JobPostForm from '@/components/organisms/JobPostForm';
import JobCard from '@/components/molecules/JobCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { jobService } from '@/services/api/jobService';

const EmployerPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'jobs', label: 'Posted Jobs', icon: 'Briefcase' },
    { id: 'post', label: 'Post New Job', icon: 'Plus' },
  ];
  
  useEffect(() => {
    loadJobs();
  }, []);
  
  const loadJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await jobService.getAll();
      // For demo purposes, show all jobs as if posted by current employer
      setJobs(data.slice(0, 5));
    } catch (err) {
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleJobPostSuccess = (newJob) => {
    setJobs(prev => [newJob, ...prev]);
    setShowJobForm(false);
    setActiveTab('jobs');
  };
  
  const getJobStats = () => {
    return {
      total: jobs.length,
      active: jobs.filter(job => new Date(job.applicationDeadline || '2024-12-31') > new Date()).length,
      applications: Math.floor(Math.random() * 100) + 50, // Mock data
      views: Math.floor(Math.random() * 500) + 200, // Mock data
    };
  };
  
  if (loading && activeTab !== 'post') return <Loading />;
  if (error && activeTab !== 'post') return <Error message={error} onRetry={loadJobs} />;
  
  const stats = getJobStats();
  
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
            Employer Portal
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your job postings and find the perfect candidates
          </p>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div
          className="border-b border-gray-200 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'post') setShowJobForm(true);
                  else setShowJobForm(false);
                }}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-5 h-5 mr-2" />
                {tab.label}
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
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="card-premium p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Briefcase" className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Jobs</div>
                </div>
                
                <div className="card-premium p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
                  <div className="text-sm text-gray-600">Active Jobs</div>
                </div>
                
                <div className="card-premium p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Send" className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.applications}</div>
                  <div className="text-sm text-gray-600">Applications</div>
                </div>
                
                <div className="card-premium p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Eye" className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.views}</div>
                  <div className="text-sm text-gray-600">Job Views</div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="card-premium p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {setActiveTab('post'); setShowJobForm(true);}}
                    icon="Plus"
                    className="h-20 flex-col space-y-2"
                  >
                    <span className="text-lg font-semibold">Post New Job</span>
                    <span className="text-sm opacity-90">Find your next hire</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setActiveTab('jobs')}
                    icon="Briefcase"
                    className="h-20 flex-col space-y-2"
                  >
                    <span className="text-lg font-semibold">Manage Jobs</span>
                    <span className="text-sm opacity-90">Edit your postings</span>
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/jobs')}
                    icon="Users"
                    className="h-20 flex-col space-y-2"
                  >
                    <span className="text-lg font-semibold">Browse Talent</span>
                    <span className="text-sm opacity-90">Find candidates</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'jobs' && (
            <div>
              {jobs.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Your Posted Jobs</h2>
                    <Button
                      variant="primary"
                      onClick={() => {setActiveTab('post'); setShowJobForm(true);}}
                      icon="Plus"
                    >
                      Post New Job
                    </Button>
                  </div>
                  {jobs.map((job) => (
                    <JobCard
                      key={job.Id}
                      job={job}
                      onSaveJob={() => {}}
                      isSaved={false}
                    />
                  ))}
                </div>
              ) : (
                <Empty
                  icon="Briefcase"
                  title="No jobs posted yet"
                  description="Start posting jobs to attract qualified candidates."
                  actionText="Post Your First Job"
                  onAction={() => {setActiveTab('post'); setShowJobForm(true);}}
                />
              )}
            </div>
          )}
          
          {activeTab === 'post' && showJobForm && (
            <JobPostForm onSuccess={handleJobPostSuccess} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerPage;