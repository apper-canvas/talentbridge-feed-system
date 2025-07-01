import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  
  const handleViewCompany = () => {
    navigate(`/companies/${company.Id}`);
  };
  
  return (
    <motion.div
      className="card p-6 hover:shadow-hover hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="w-12 h-12 rounded-lg object-cover" />
          ) : (
            <ApperIcon name="Building2" className="w-8 h-8 text-primary-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 hover:text-primary-600 cursor-pointer transition-colors duration-200 truncate">
            {company.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{company.industry}</p>
          <div className="flex items-center text-sm text-gray-500">
            <ApperIcon name="Users" className="w-4 h-4 mr-1" />
            {company.size} employees
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {company.description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-primary-600 font-medium">
          <ApperIcon name="Briefcase" className="w-4 h-4 mr-1" />
          {company.openPositions || 0} open positions
        </div>
        {company.verified && (
          <Badge variant="success" size="sm" className="flex items-center">
            <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {company.benefits?.slice(0, 3).map((benefit, index) => (
          <Badge key={index} variant="default" size="sm">{benefit}</Badge>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleViewCompany}
        className="w-full"
        icon="ArrowRight"
        iconPosition="right"
      >
        View Company
      </Button>
    </motion.div>
  );
};

export default CompanyCard;