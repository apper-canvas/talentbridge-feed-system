import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ onSearch, placeholder = "Search jobs, companies, or keywords..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  
const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, skills);
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      const skillName = currentSkill.trim();
      if (!skills.includes(skillName) && skills.length < 10) {
        setSkills([...skills, skillName]);
        setCurrentSkill('');
      }
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
<div className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-premium border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
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
        
        {/* Skills Input */}
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Add skills (press Enter to add)..."
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleSkillAdd}
            icon="Tag"
            className="mb-0"
          />
          
          {/* Skills Tags */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800 border border-primary-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="ml-2 text-primary-600 hover:text-primary-800 focus:outline-none"
                  >
                    <ApperIcon name="X" className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.form>
  );
};

export default SearchBar;