import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Loader2 } from 'lucide-react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import JobDetails from '../components/jobs/JobDetails';
import ApplyButton from '../components/jobs/ApplyButton';
import SuccessMessage from '../components/ui/SuccessMessage';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAppliedSuccessfully, setIsAppliedSuccessfully] = useState(false);

  // 🔹 Configure toastr once
  useEffect(() => {
    toastr.options = {
      positionClass: 'toast-bottom-right',
      timeOut: 4000,
      progressBar: true,
      closeButton: true,
    };
  }, []);

  // 🔹 Fetch job safely
  useEffect(() => {
    let isMounted = true;

    const loadJob = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Job not found or an error occurred.');
        }

        const data = await response.json();
        
        if (isMounted) setJob(data.job || data);
      } catch (err) {
        if (isMounted) {
          setError('We could not find this job listing. It may have been removed or the URL is incorrect.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadJob();

    return () => {
      isMounted = false; // prevent state update after unmount
    };
  }, [id]);

  const handleSimulateApply = () => {
    if (!job) return;
    setIsAppliedSuccessfully(true);
    toastr.success(`Successfully applied for the ${job.title} role!`, 'Application Sent');
  };

  // 🔹 Loading State
  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-gray-400 text-sm sm:text-base">
          Loading job details...
        </p>
      </div>
    );
  }

  // 🔹 Error State
  if (error || !job) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500/10 text-red-500 
          flex items-center justify-center mb-5">
          <span className="text-xl sm:text-2xl font-bold">!</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-3">
          Job Not Found
        </h1>

        <p className="text-gray-400 text-sm sm:text-base max-w-sm mb-6">
          {error}
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 
          bg-slate-800 hover:bg-slate-700 text-white 
          rounded-lg sm:rounded-xl transition"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 
      py-6 sm:py-8 pb-20 sm:pb-24">

      {/* 🔹 Back */}
      <Link
        to="/"
        className="inline-flex items-center text-xs sm:text-sm text-gray-400 
        hover:text-indigo-400 transition mb-6 sm:mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to listings
      </Link>

      {/* 🔹 Layout */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">

        {/* Main */}
        <div className="flex-1 min-w-0">
          <JobDetails job={job} />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`lg:sticky lg:top-24 ${isAppliedSuccessfully ? '' : 'bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-6'}`}
          >
            {isAppliedSuccessfully ? (
              <SuccessMessage 
                title="Application Sent!" 
                message={`Your application for ${job.title} at ${job.company} has been securely submitted.`}
                linkTo="/my-applications"
                linkText="View My Applications"
              />
            ) : (
              <>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  Ready to apply?
                </h3>
    
                <p className="text-xs sm:text-sm text-gray-400 mb-5">
                  Review requirements before submitting your application.
                </p>
    
                <ApplyButton jobId={job._id || job.id} onSimulateApply={handleSimulateApply} />
    
                {/* Meta */}
                <div className="mt-5 pt-5 border-t border-slate-800 space-y-3 text-xs sm:text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Job ID</span>
                    <span className="text-gray-200">
                      #{(job._id || job.id)?.substring(0, 5) || '00000'}
                    </span>
                  </div>
    
                  <div className="flex justify-between">
                    <span>Location</span>
                    <span className="text-gray-200">
                      {job.location}
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default JobDetailsPage;