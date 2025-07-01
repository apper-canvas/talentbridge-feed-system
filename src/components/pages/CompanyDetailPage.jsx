import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import JobCard from '@/components/molecules/JobCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { companyService } from '@/services/api/companyService';
import { jobService } from '@/services/api/jobService';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    loadCompanyData();
  }, [id]);
  
  const loadCompanyData = async () => {
    setLoading(true);
    setError('');
    try {
      const [companyData, jobsData] = await Promise.all([
        companyService.getById(parseInt(id)),
        jobService.getAll()
      ]);
      
      setCompany(companyData);
      // Filter jobs for this company
      const companyJobs = jobsData.filter(job => 
        job.company?.Id === companyData.Id || 
        job.companyName === companyData.name
      );
      setJobs(companyJobs);
    } catch (err) {
      setError('Failed to load company details. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCompanyData} />;
  if (!company) return <Error message="Company not found" showRetry={false} />;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/companies')}
            icon="ArrowLeft"
            className="text-gray-600 hover:text-primary-600"
          >
            Back to Companies
          </Button>
        </motion.div>
        
        {/* Company Header */}
        <motion.div
          className="card-premium p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-20 h-20 rounded-xl object-cover" />
              ) : (
                <ApperIcon name="Building2" className="w-12 h-12 text-primary-600" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{company.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{company.industry}</p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <ApperIcon name="Users" className="w-5 h-5 mr-2" />
                    <span>{company.size} employees</span>
                  </div>
                  {company.verified && (
                    <Badge variant="success" className="flex items-center w-fit">
                      <ApperIcon name="CheckCircle" className="w-4 h-4 mr-1" />
                      Verified Company
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                  <ApperIcon name="Briefcase" className="w-6 h-6 text-primary-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-primary-600">
                      {jobs.length}
                    </div>
                    <div className="text-sm text-gray-600">Open Positions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Company Details */}
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
                <ApperIcon name="Info" className="w-6 h-6 mr-3 text-primary-500" />
                About Company
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {company.description}
              </p>
            </motion.div>
            
            {company.culture && (
              <motion.div
                className="card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ApperIcon name="Heart" className="w-6 h-6 mr-3 text-primary-500" />
                  Company Culture
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {company.culture}
                </p>
              </motion.div>
            )}
            
            {/* Open Positions */}
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ApperIcon name="Briefcase" className="w-6 h-6 mr-3 text-primary-500" />
                Open Positions ({jobs.length})
              </h2>
              
              {jobs.length > 0 ? (
                <div className="space-y-6">
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
                  title="No open positions"
                  description="This company doesn't have any open positions at the moment. Check back later for new opportunities."
                  actionText="View All Jobs"
                  onAction={() => navigate('/jobs')}
                />
              )}
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {company.benefits && company.benefits.length > 0 && (
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ApperIcon name="Gift" className="w-5 h-5 mr-2 text-primary-500" />
                  Benefits & Perks
                </h3>
                <div className="space-y-3">
                  {company.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <ApperIcon name="Check" className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="Building2" className="w-5 h-5 mr-2 text-primary-500" />
                Company Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Industry</span>
                  <p className="text-gray-900">{company.industry}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Company Size</span>
                  <p className="text-gray-900">{company.size} employees</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;