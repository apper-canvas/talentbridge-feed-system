import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApplicationForm from '@/components/organisms/ApplicationForm';
import ApperIcon from '@/components/ApperIcon';
import { jobService } from '@/services/api/jobService';
import { toast } from 'react-toastify';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    loadJob();
    checkIfSaved();
  }, [id]);
  
  const loadJob = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await jobService.getById(parseInt(id));
      setJob(data);
    } catch (err) {
      setError('Failed to load job details. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const checkIfSaved = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsSaved(savedJobs.includes(parseInt(id)));
  };
  
  const handleSaveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const jobId = parseInt(id);
    
    if (isSaved) {
      const updatedSaved = savedJobs.filter(savedId => savedId !== jobId);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
      setIsSaved(false);
      toast.info('Job removed from saved jobs');
    } else {
      savedJobs.push(jobId);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      setIsSaved(true);
      toast.success('Job saved successfully!');
    }
  };
  
  const formatSalary = (salary) => {
    if (!salary) return 'Salary not disclosed';
    if (salary.min && salary.max) {
      return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
    }
    return `$${salary.amount?.toLocaleString() || 'Competitive'}`;
  };
  
  const handleApplicationSuccess = (application) => {
    setShowApplicationForm(false);
    toast.success('Application submitted successfully!');
    navigate('/dashboard');
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadJob} />;
  if (!job) return <Error message="Job not found" showRetry={false} />;
  
  if (showApplicationForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplicationForm
            job={job}
            onSuccess={handleApplicationSuccess}
            onCancel={() => setShowApplicationForm(false)}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/jobs')}
            icon="ArrowLeft"
            className="text-gray-600 hover:text-primary-600"
          >
            Back to Jobs
          </Button>
        </motion.div>
        
        {/* Job Header */}
        <motion.div
          className="card-premium p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Building2" className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-gray-600 font-medium">
                    {job.company?.name || job.companyName}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="MapPin" className="w-5 h-5 mr-3 text-primary-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="DollarSign" className="w-5 h-5 mr-3 text-primary-500" />
                  <span>{formatSalary(job.salary)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ApperIcon name="Clock" className="w-5 h-5 mr-3 text-primary-500" />
                  <span>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary">{job.type}</Badge>
                <Badge variant="secondary">{job.experience}</Badge>
                {job.remote && <Badge variant="success">Remote</Badge>}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleSaveJob}
                icon={isSaved ? "Heart" : "Heart"}
                className={`${isSaved ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}`}
              >
                {isSaved ? 'Saved' : 'Save Job'}
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowApplicationForm(true)}
                icon="Send"
                className="shadow-lg hover:shadow-xl"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ApperIcon name="FileText" className="w-6 h-6 mr-3 text-primary-500" />
                Job Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ApperIcon name="CheckSquare" className="w-6 h-6 mr-3 text-primary-500" />
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements?.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <ApperIcon name="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="Info" className="w-5 h-5 mr-2 text-primary-500" />
                Job Information
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Job Type</span>
                  <p className="text-gray-900">{job.type}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Experience Level</span>
                  <p className="text-gray-900">{job.experience}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Posted Date</span>
                  <p className="text-gray-900">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </p>
                </div>
                {job.applicationDeadline && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Application Deadline</span>
                    <p className="text-gray-900">
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="Building2" className="w-5 h-5 mr-2 text-primary-500" />
                About Company
              </h3>
              <div className="text-center mb-4">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/companies/${job.company?.Id || 1}`)}
                  className="w-full"
                  icon="ArrowRight"
                  iconPosition="right"
                >
                  View Company Profile
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;