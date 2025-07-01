import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "Search",
  title = "No results found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  actionText,
  onAction,
  className = "" 
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {actionText && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          icon="ArrowRight"
          iconPosition="right"
          className="shadow-lg hover:shadow-xl"
        >
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;