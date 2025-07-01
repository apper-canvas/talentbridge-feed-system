import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const JobCard = ({ job, onSaveJob, isSaved = false }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/jobs/${job.Id}`);
  };
  
  const formatSalary = (salary) => {
    if (!salary) return 'Salary not disclosed';
    if (salary.min && salary.max) {
      return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
    }
    return `$${salary.amount?.toLocaleString() || 'Competitive'}`;
  };
  
  return (
    <motion.div
      className="card p-6 hover:shadow-hover hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Building2" className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 hover:text-primary-600 cursor-pointer transition-colors duration-200">
                {job.title}
              </h3>
              <p className="text-gray-600 font-medium">{job.company?.name || job.companyName}</p>
            </div>
          </div>
        </div>
        <motion.button
          onClick={() => onSaveJob(job.Id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ApperIcon 
            name={isSaved ? "Heart" : "Heart"} 
            className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </motion.button>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
          {job.location}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="DollarSign" className="w-4 h-4 mr-2" />
          {formatSalary(job.salary)}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
          {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="primary" size="sm">{job.type}</Badge>
        <Badge variant="secondary" size="sm">{job.experience}</Badge>
        {job.remote && <Badge variant="success" size="sm">Remote</Badge>}
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {job.description?.substring(0, 150)}...
      </p>
      
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewDetails}
          className="flex-1 mr-3"
        >
          View Details
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon="Send"
          onClick={handleViewDetails}
        >
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
};

export default JobCard;