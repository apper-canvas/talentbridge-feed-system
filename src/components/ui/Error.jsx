import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  showRetry = true,
  className = "" 
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="w-10 h-10 text-red-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <Button
          variant="primary"
          onClick={onRetry}
          icon="RefreshCw"
          className="shadow-lg hover:shadow-xl"
        >
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;