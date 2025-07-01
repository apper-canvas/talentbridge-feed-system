import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { jobService } from '@/services/api/jobService';

const JobPostForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    type: 'Full-time',
    experience: 'Mid Level',
    description: '',
    requirements: [],
    salary: {
      min: '',
      max: '',
    },
    applicationDeadline: '',
  });
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  
  const handleChange = (field, value) => {
    if (field.startsWith('salary.')) {
      const salaryField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        salary: { ...prev.salary, [salaryField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()]
      }));
      setCurrentRequirement('');
    }
  };
  
  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (formData.requirements.length === 0) newErrors.requirements = 'At least one requirement is needed';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const jobData = {
        ...formData,
        salary: {
          min: parseInt(formData.salary.min) || null,
          max: parseInt(formData.salary.max) || null,
        },
        postedDate: new Date().toISOString(),
        company: {
          name: formData.companyName,
        },
      };
      
      const newJob = await jobService.create(jobData);
      toast.success('Job posted successfully!');
      onSuccess(newJob);
    } catch (error) {
      toast.error('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      className="card-premium p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Plus" className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold gradient-text mb-2">Post a New Job</h2>
        <p className="text-gray-600">Find the perfect candidate for your open position</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Job Title"
            placeholder="e.g. Senior Software Engineer"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={errors.title}
            icon="Briefcase"
            required
          />
          
          <Input
            label="Company Name"
            placeholder="Your company name"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            error={errors.companyName}
            icon="Building2"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Location"
            placeholder="City, State or Remote"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            error={errors.location}
            icon="MapPin"
            required
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="input-field"
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <select
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className="input-field"
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Minimum Salary"
            type="number"
            placeholder="50000"
            value={formData.salary.min}
            onChange={(e) => handleChange('salary.min', e.target.value)}
            icon="DollarSign"
          />
          
          <Input
            label="Maximum Salary"
            type="number"
            placeholder="80000"
            value={formData.salary.max}
            onChange={(e) => handleChange('salary.max', e.target.value)}
            icon="DollarSign"
          />
        </div>
        
        <Input
          label="Application Deadline"
          type="date"
          value={formData.applicationDeadline}
          onChange={(e) => handleChange('applicationDeadline', e.target.value)}
          icon="Calendar"
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Job Description <span className="text-error">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
            rows={6}
            className={`input-field resize-none ${errors.description ? 'border-error focus:ring-error focus:border-error' : ''}`}
          />
          {errors.description && (
            <p className="text-sm text-error flex items-center">
              <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
              {errors.description}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Requirements <span className="text-error">*</span>
          </label>
          
          <div className="flex gap-3">
            <Input
              placeholder="Add a requirement (e.g. 3+ years experience with React)"
              value={currentRequirement}
              onChange={(e) => setCurrentRequirement(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
              className="flex-1 mb-0"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addRequirement}
              icon="Plus"
              disabled={!currentRequirement.trim()}
            >
              Add
            </Button>
          </div>
          
          {formData.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.requirements.map((req, index) => (
                <Badge
                  key={index}
                  variant="primary"
                  className="flex items-center pr-1"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <ApperIcon name="X" className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          
          {errors.requirements && (
            <p className="text-sm text-error flex items-center">
              <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
              {errors.requirements}
            </p>
          )}
        </div>
        
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon="Send"
            className="min-w-48"
          >
            Post Job
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default JobPostForm;