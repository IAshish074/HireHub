import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Building2 } from 'lucide-react';
import Button from '../ui/Button';

const JobCard = ({ job, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="group bg-slate-900/80 backdrop-blur-xl border border-slate-800 
      rounded-xl sm:rounded-2xl p-4 sm:p-6 
      hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/10 
      transition-all duration-300 flex flex-col w-full"
    >

      {/* Header */}
      <div className="flex justify-between items-start mb-4 sm:mb-6 gap-3">
        <div className="flex gap-3 sm:gap-4">

          {/* Logo */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
          flex items-center justify-center shadow-md shrink-0">
            <span className="text-white font-bold text-base sm:text-lg">
              {job.logoLetter}
            </span>
          </div>

          {/* Title + Company */}
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-1 
              group-hover:text-indigo-400 transition-colors">
              {job.title}
            </h3>

            <div className="flex items-center text-gray-400 text-xs sm:text-sm mt-1">
              <Building2 className="w-3.5 h-3.5 mr-1 shrink-0" />
              <span className="truncate">{job.company}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        <span className="flex items-center px-2.5 sm:px-3 py-1 rounded-full 
        bg-slate-800 text-xs text-gray-300 border border-slate-700">
          <MapPin className="w-3 h-3 mr-1 text-indigo-400" />
          {job.location}
        </span>

        <span className="flex items-center px-2.5 sm:px-3 py-1 rounded-full 
        bg-slate-800 text-xs text-gray-300 border border-slate-700">
          <DollarSign className="w-3 h-3 mr-1 text-emerald-400" />
          {job.salary}
        </span>

        <span className="flex items-center px-2.5 sm:px-3 py-1 rounded-full 
        bg-slate-800 text-xs text-gray-300 border border-slate-700">
          <Clock className="w-3 h-3 mr-1 text-amber-400" />
          {job.type}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mb-4 sm:mb-6 flex-1">
        {job.description}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          Posted {job.postedAt}
        </span>
        <Link to={`/jobs/${job._id || job.id}`}>
          <Button variant="primary" size="sm">
            View Details
          </Button>
        </Link>
      </div>

    </motion.div>
  );
};

export default JobCard;