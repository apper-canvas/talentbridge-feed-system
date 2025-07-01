import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ApplicationCard = ({ application, onViewJob, onWithdraw }) => {
  const getStatusVariant = (status) => {
    const statusMap = {
      'submitted': 'info',
      'viewed': 'warning',
      'interview': 'primary',
      'rejected': 'error',
      'accepted': 'success',
    };
    return statusMap[status.toLowerCase()] || 'default';
  };
  
  const getStatusIcon = (status) => {
    const iconMap = {
      'submitted': 'Send',
      'viewed': 'Eye',
      'interview': 'Calendar',
      'rejected': 'X',
      'accepted': 'CheckCircle',
    };
    return iconMap[status.toLowerCase()] || 'Clock';
  };
  
  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {application.job?.title || application.jobTitle}
          </h3>
          <p className="text-gray-600 font-medium mb-2">
            {application.job?.company?.name || application.companyName}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
            Applied {formatDistanceToNow(new Date(application.appliedDate), { addSuffix: true })}
          </div>
        </div>
        <Badge 
          variant={getStatusVariant(application.status)} 
          className="flex items-center"
        >
          <ApperIcon name={getStatusIcon(application.status)} className="w-3 h-3 mr-1" />
          {application.status}
        </Badge>
      </div>
      
      {application.lastUpdated && application.lastUpdated !== application.appliedDate && (
        <div className="text-sm text-gray-500 mb-4 flex items-center">
          <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
          Last updated {formatDistanceToNow(new Date(application.lastUpdated), { addSuffix: true })}
        </div>
      )}
      
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewJob(application.job?.Id || application.jobId)}
          icon="ExternalLink"
        >
          View Job
        </Button>
        {application.status.toLowerCase() === 'submitted' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onWithdraw(application.Id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            icon="X"
          >
            Withdraw
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ApplicationCard;