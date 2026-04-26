import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import JobCard from './JobCard';

const JobList = ({ jobs, isLoading }) => {

  // 🔹 Loading Skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-56 sm:h-64 rounded-xl sm:rounded-2xl 
            bg-slate-900/70 border border-slate-800 
            animate-pulse backdrop-blur-md"
          />
        ))}
      </div>
    );
  }

  // 🔹 Empty State
  if (!jobs || jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mt-6 px-4 sm:px-6"
      >
        <div className="flex flex-col items-center justify-center text-center 
        bg-slate-900/70 backdrop-blur-xl border border-dashed border-slate-700
        rounded-2xl sm:rounded-3xl py-12 sm:py-16 px-6">

          {/* Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-800 
          flex items-center justify-center text-gray-500 mb-4">
            <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            No jobs found
          </h3>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base max-w-xs sm:max-w-sm">
            Try adjusting your search or filters to find better results.
          </p>
        </div>
      </motion.div>
    );
  }

  // 🔹 Job Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
      {jobs.map((job, index) => (
        <JobCard key={job.id} job={job} index={index} />
      ))}
    </div>
  );
};

export default JobList;