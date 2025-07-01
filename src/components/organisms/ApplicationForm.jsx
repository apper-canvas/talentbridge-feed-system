import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { applicationService } from '@/services/api/applicationService';

const ApplicationForm = ({ job, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    candidateId: 'user-1', // Mock user ID
    resume: '',
    coverLetter: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.resume.trim()) {
      newErrors.resume = 'Resume/CV is required';
    }
    
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const applicationData = {
        jobId: job.Id,
        candidateId: formData.candidateId,
        resume: formData.resume,
        coverLetter: formData.coverLetter,
        status: 'submitted',
        appliedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      
      const newApplication = await applicationService.create(applicationData);
      toast.success('Application submitted successfully!');
      onSuccess(newApplication);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      className="card-premium p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Send" className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for Position</h2>
        <p className="text-gray-600">
          Applying for <span className="font-semibold text-primary-600">{job.title}</span> at {job.company?.name || job.companyName}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Resume/CV"
          type="url"
          placeholder="Link to your resume or CV"
          value={formData.resume}
          onChange={(e) => handleChange('resume', e.target.value)}
          error={errors.resume}
          icon="FileText"
          required
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Cover Letter <span className="text-error">*</span>
          </label>
          <textarea
            value={formData.coverLetter}
            onChange={(e) => handleChange('coverLetter', e.target.value)}
            placeholder="Write a compelling cover letter that highlights your interest in this position..."
            rows={6}
            className={`input-field resize-none ${errors.coverLetter ? 'border-error focus:ring-error focus:border-error' : ''}`}
          />
          {errors.coverLetter && (
            <p className="text-sm text-error flex items-center">
              <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
              {errors.coverLetter}
            </p>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ApperIcon name="Info" className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Application Tips:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Tailor your cover letter to this specific position</li>
                <li>• Highlight relevant experience and achievements</li>
                <li>• Show enthusiasm for the company and role</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1"
            icon="Send"
          >
            Submit Application
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ApplicationForm;