import React from 'react';
import { motion } from 'framer-motion';
import CompanyCard from '@/components/molecules/CompanyCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const CompanyGrid = ({ companies, loading, error, onRetry, className = '' }) => {
  if (loading) return <Loading type="companies" />;
  if (error) return <Error message={error} onRetry={onRetry} />;
  if (!companies || companies.length === 0) {
    return (
      <Empty
        icon="Building2"
        title="No companies found"
        description="Try adjusting your search criteria to discover more companies."
        actionText="Clear Search"
        onAction={onRetry}
      />
    );
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {companies.length} compan{companies.length !== 1 ? 'ies' : 'y'} found
        </h2>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {companies.map((company) => (
          <CompanyCard key={company.Id} company={company} />
        ))}
      </motion.div>
    </div>
  );
};

export default CompanyGrid;