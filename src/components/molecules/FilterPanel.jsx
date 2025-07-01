import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
const formatSalary = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value.toLocaleString()}`;
  };

  const salaryRange = filters.salaryRange || [0, 200000];
  
  return (
    <motion.div 
      className="card p-6 space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ApperIcon name="Filter" className="w-5 h-5 mr-2 text-primary-500" />
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-500 hover:text-primary-500"
        >
          Clear All
        </Button>
      </div>
      
      {/* Location Filter */}
      <div>
        <Input
          label="Location"
          placeholder="City, state, or remote"
          value={filters.location || ''}
          onChange={(e) => onFilterChange('location', e.target.value)}
          icon="MapPin"
        />
      </div>
      
      {/* Job Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Job Type</label>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.jobType?.includes(type) || false}
                onChange={(e) => {
                  const currentTypes = filters.jobType || [];
                  const newTypes = e.target.checked
                    ? [...currentTypes, type]
                    : currentTypes.filter((t) => t !== type);
                  onFilterChange('jobType', newTypes);
                }}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Experience Level Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Experience Level</label>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.experience?.includes(level) || false}
                onChange={(e) => {
                  const currentLevels = filters.experience || [];
                  const newLevels = e.target.checked
                    ? [...currentLevels, level]
                    : currentLevels.filter((l) => l !== level);
                  onFilterChange('experience', newLevels);
                }}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>
      
{/* Salary Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Salary Range: {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
        </label>
        <div className="px-2 py-4">
          <Slider
            range
            min={0}
            max={200000}
            step={5000}
            value={salaryRange}
            onChange={(value) => onFilterChange('salaryRange', value)}
            trackStyle={[{ backgroundColor: '#3B82F6' }]}
            handleStyle={[
              { borderColor: '#3B82F6', backgroundColor: '#3B82F6' },
              { borderColor: '#3B82F6', backgroundColor: '#3B82F6' }
            ]}
            railStyle={{ backgroundColor: '#E5E7EB' }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>$0</span>
            <span>$200k+</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;