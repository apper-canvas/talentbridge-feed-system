import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { cvService } from '@/services/api/cvService';

const UploadCVPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    skills: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const uploadedFile = await cvService.uploadFile(file);
      setUploadedFiles([uploadedFile]);
      toast.success('CV uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload CV. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  const handleInputChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (uploadedFiles.length === 0) {
      toast.error('Please upload your CV first');
      return;
    }

    if (!personalInfo.fullName || !personalInfo.email) {
      toast.error('Please fill in your name and email');
      return;
    }

    try {
      await cvService.submitApplication({
        ...personalInfo,
        cvFile: uploadedFiles[0]
      });
      toast.success('Your CV has been submitted successfully!');
      
      // Reset form
      setPersonalInfo({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        skills: ''
      });
      setUploadedFiles([]);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(files => files.filter(f => f.Id !== fileId));
    toast.info('File removed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upload Your CV
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your resume with top employers and unlock amazing career opportunities.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* CV Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="Upload" className="w-6 h-6 mr-3 text-blue-600" />
              Upload Resume
            </h2>

            {uploadedFiles.length === 0 ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <ApperIcon 
                  name={isUploading ? "Loader2" : "CloudUpload"} 
                  className={`w-16 h-16 mx-auto mb-4 text-gray-400 ${isUploading ? 'animate-spin' : ''}`} 
                />
                {isUploading ? (
                  <p className="text-lg text-gray-600">Uploading...</p>
                ) : isDragActive ? (
                  <p className="text-lg text-blue-600">Drop your CV here...</p>
                ) : (
                  <>
                    <p className="text-lg text-gray-600 mb-2">
                      Drag & drop your CV here, or click to select
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, DOC, DOCX files up to 5MB
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div key={file.Id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <ApperIcon name="FileText" className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      icon="X"
                      onClick={() => removeFile(file.Id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="User" className="w-6 h-6 mr-3 text-blue-600" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name *"
                type="text"
                value={personalInfo.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
              <Input
                label="Email Address *"
                type="email"
                value={personalInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
              <Input
                label="Desired Position"
                type="text"
                value={personalInfo.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="e.g., Software Engineer"
              />
              <Input
                label="Years of Experience"
                type="text"
                value={personalInfo.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="e.g., 3-5 years"
              />
              <Input
                label="Key Skills"
                type="text"
                value={personalInfo.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                placeholder="e.g., React, Node.js, Python"
              />
            </div>
          </motion.div>

          {/* Submit Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon="Send"
              className="px-12 py-4"
              disabled={isUploading}
            >
              Submit Application
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Your information will be shared with our partner companies looking for talent like you.
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default UploadCVPage;