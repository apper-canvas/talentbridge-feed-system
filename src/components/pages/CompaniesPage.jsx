import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import CompanyGrid from '@/components/organisms/CompanyGrid';
import { companyService } from '@/services/api/companyService';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    loadCompanies();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [companies, searchTerm]);
  
  const loadCompanies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (err) {
      setError('Failed to load companies. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...companies];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(term) ||
        company.industry.toLowerCase().includes(term) ||
        company.description?.toLowerCase().includes(term)
      );
    }
    
    setFilteredCompanies(filtered);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-secondary-600 via-primary-600 to-accent-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Discover Amazing Companies
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
              Explore organizations that align with your values and career goals
            </p>
          </motion.div>
          
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search companies by name, industry, or description..."
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CompanyGrid
          companies={filteredCompanies}
          loading={loading}
          error={error}
          onRetry={loadCompanies}
        />
      </div>
    </div>
  );
};

export default CompaniesPage;