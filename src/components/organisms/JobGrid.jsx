import React from 'react';
import { motion } from 'framer-motion';
import JobCard from '@/components/molecules/JobCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const JobGrid = ({ 
  jobs, 
  loading, 
  error, 
  onRetry, 
  onSaveJob, 
  savedJobs = [],
  className = '' 
}) => {
  if (loading) return <Loading type="jobs" />;
  if (error) return <Error message={error} onRetry={onRetry} />;
  if (!jobs || jobs.length === 0) {
    return (
      <Empty
        icon="Briefcase"
        title="No jobs found"
        description="Try adjusting your search criteria or filters to find more opportunities."
        actionText="Clear Filters"
        onAction={onRetry}
      />
    );
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
        </h2>
      </div>
      
      <motion.div 
        className="grid gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {jobs.map((job) => (
          <JobCard
            key={job.Id}
            job={job}
            onSaveJob={onSaveJob}
            isSaved={savedJobs.includes(job.Id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default JobGrid;