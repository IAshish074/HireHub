import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/jobs/SearchBar';
import FilterDropdown from '../components/jobs/FilterDropdown';
import JobList from '../components/jobs/JobList';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState(null);

  // 🔹 Debounce effect & Fetch logic
  useEffect(() => {
    const controller = new AbortController();

    const loadJobs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('search', searchQuery);
        if (filter !== 'All') queryParams.append('filter', filter);

        const response = await fetch(`/api/jobs?${queryParams.toString()}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs.');
        }

        const data = await response.json();
        setJobs(data.jobs || data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching jobs", err);
          setError("Failed to load jobs. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(loadJobs, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchQuery, filter]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 
      py-6 sm:py-8 space-y-6 sm:space-y-8">

      {/* 🔹 Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">

        {/* Title */}
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2"
          >
            Find your next role
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-sm sm:text-base max-w-md"
          >
            Discover job opportunities tailored to your skills and interests.
          </motion.p>
        </div>

        {/* 🔹 Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 min-w-0">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="w-full sm:w-auto">
            <FilterDropdown filter={filter} setFilter={setFilter} />
          </div>
        </motion.div>
      </div>

      {/* 🔹 Error State */}
      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* 🔹 Job List */}
      <JobList jobs={jobs} isLoading={isLoading} />

    </div>
  );
};

export default Dashboard;