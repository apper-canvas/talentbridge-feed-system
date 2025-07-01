import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search jobs, companies, or keywords..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-3 p-6 bg-white rounded-2xl shadow-premium border border-gray-100">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="Search"
            className="mb-0"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="Search"
          className="whitespace-nowrap"
        >
          Search Jobs
        </Button>
      </div>
    </motion.form>
  );
};

export default SearchBar;