import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import FilterPanel from '@/components/molecules/FilterPanel';
import JobGrid from '@/components/organisms/JobGrid';
import { jobService } from '@/services/api/jobService';
import { toast } from 'react-toastify';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
const [searchTerm, setSearchTerm] = useState('');
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [filters, setFilters] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  
  useEffect(() => {
    loadJobs();
    loadSavedJobs();
  }, []);
  
useEffect(() => {
    applyFilters();
  }, [jobs, searchTerm, skillsFilter, filters]);
  
  const loadJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await jobService.getAll();
      setJobs(data);
    } catch (err) {
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const loadSavedJobs = () => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(saved);
  };
  
  const applyFilters = () => {
    let filtered = [...jobs];
    
// Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.company?.name?.toLowerCase().includes(term) ||
        job.companyName?.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.description?.toLowerCase().includes(term)
      );
    }

    // Apply skills filter
    if (skillsFilter.length > 0) {
      filtered = filtered.filter(job => {
        const jobSkills = [
          ...(job.skills || []),
          ...job.requirements.map(req => req.toLowerCase()),
          job.title.toLowerCase(),
          job.description?.toLowerCase() || ''
        ].join(' ').toLowerCase();
        
        return skillsFilter.some(skill => 
          jobSkills.includes(skill.toLowerCase())
        );
      });
    }
    
    // Apply location filter
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location)
      );
    }
    
    // Apply job type filter
    if (filters.jobType && filters.jobType.length > 0) {
      filtered = filtered.filter(job =>
        filters.jobType.includes(job.type)
      );
    }
    
    // Apply experience filter
    if (filters.experience && filters.experience.length > 0) {
      filtered = filtered.filter(job =>
        filters.experience.includes(job.experience)
      );
    }
    
// Apply salary range filter
    if (filters.salaryRange && Array.isArray(filters.salaryRange)) {
      const [minFilter, maxFilter] = filters.salaryRange;
      filtered = filtered.filter(job => {
        if (!job.salary) return false;
        const jobMin = job.salary.min || job.salary.amount || 0;
        const jobMax = job.salary.max || job.salary.amount || jobMin;
        
        // Job salary range overlaps with filter range
        return jobMax >= minFilter && jobMin <= maxFilter;
      });
    }
    
    setFilteredJobs(filtered);
  };
  
const handleSearch = (term, skills = []) => {
    setSearchTerm(term);
    setSkillsFilter(skills);
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
const handleClearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setSkillsFilter([]);
  };
  
  const handleSaveJob = (jobId) => {
    const saved = [...savedJobs];
    const index = saved.indexOf(jobId);
    
    if (index > -1) {
      saved.splice(index, 1);
      toast.info('Job removed from saved jobs');
    } else {
      saved.push(jobId);
      toast.success('Job saved successfully!');
    }
    
    setSavedJobs(saved);
    localStorage.setItem('savedJobs', JSON.stringify(saved));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
              Discover opportunities that match your skills and passion
            </p>
          </motion.div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
          
          {/* Jobs Grid */}
          <div className="lg:col-span-3">
            <JobGrid
              jobs={filteredJobs}
              loading={loading}
              error={error}
              onRetry={loadJobs}
              onSaveJob={handleSaveJob}
              savedJobs={savedJobs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;