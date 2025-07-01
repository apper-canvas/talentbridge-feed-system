import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const ResumePreviewModal = ({ isOpen, onClose, resumeUrl, jobTitle, onDownload }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    if (isOpen && resumeUrl) {
      setLoading(true);
      setError('');
      setPdfError(false);
      
      // Simulate loading time for resume preview
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, resumeUrl]);

  const handleDownload = async () => {
    try {
      await onDownload();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const renderPreviewContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <Loading />
        </div>
      );
    }

    if (error || pdfError) {
      return (
        <div className="flex items-center justify-center h-96">
          <Error 
            message="Unable to preview resume. Please check the URL or try downloading directly." 
            showRetry={false}
          />
        </div>
      );
    }

    // Mock resume preview content
    return (
      <div className="bg-white border rounded-lg p-8 h-96 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">John Doe</h1>
            <p className="text-gray-600 mb-1">john.doe@example.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              Target Position
            </h2>
            <p className="text-gray-700">{jobTitle}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700">
              Experienced software developer with 5+ years of professional experience in building 
              scalable web applications. Proficient in modern JavaScript frameworks and cloud technologies.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              Experience
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Senior Software Developer</h3>
                <p className="text-gray-600 text-sm">Tech Company Inc. | 2021 - Present</p>
                <ul className="text-gray-700 text-sm mt-2 list-disc list-inside">
                  <li>Developed and maintained React-based web applications</li>
                  <li>Collaborated with cross-functional teams to deliver features</li>
                  <li>Improved application performance by 40%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'JavaScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                <span 
                  key={skill}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              Education
            </h2>
            <div>
              <h3 className="font-medium text-gray-900">Bachelor of Science in Computer Science</h3>
              <p className="text-gray-600 text-sm">University of Technology | 2018</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="FileText" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Resume Preview</h2>
                  <p className="text-sm text-gray-600">Review your resume before submission</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                icon="X"
                className="text-gray-400 hover:text-gray-600"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {renderPreviewContent()}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Info" className="w-4 h-4 mr-2" />
                This is a preview of how your resume will appear
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="px-6"
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  icon="Download"
                  className="px-6"
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ResumePreviewModal;