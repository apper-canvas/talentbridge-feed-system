import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Logo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };
  
  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  };
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-lg">
        <ApperIcon name="Bridge" className="text-white" size={iconSizes[size]} />
      </div>
      <span className={`font-display font-bold gradient-text ${sizeClasses[size]}`}>
        TalentBridge
      </span>
    </div>
  );
};

export default Logo;