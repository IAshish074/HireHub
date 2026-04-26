import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Clock, Building2, CheckCircle2 } from 'lucide-react';

const JobDetails = ({ job }) => {
  if (!job) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Profile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-slate-800/50">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl shadow-indigo-500/20 shrink-0">
          <span className="text-white font-bold text-3xl sm:text-4xl">{job.logoLetter}</span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
            <span className="flex items-center"><Building2 className="w-4 h-4 mr-1" /> {job.company}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Posted {job.postedAt}</span>
          </div>
        </div>
      </div>

      {/* Meta Pills */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400"><MapPin className="w-4 h-4" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium whitespace-nowrap">Location</p>
            <p className="text-sm text-slate-200 font-medium whitespace-nowrap">{job.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400"><DollarSign className="w-4 h-4" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium whitespace-nowrap">Salary</p>
            <p className="text-sm text-slate-200 font-medium whitespace-nowrap">{job.salary}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400"><Clock className="w-4 h-4" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium whitespace-nowrap">Job Type</p>
            <p className="text-sm text-slate-200 font-medium whitespace-nowrap">{job.type}</p>
          </div>
        </div>
      </div>

      {/* Longform Text Sections */}
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        
        <section>
          <h2 className="text-xl font-bold text-white mb-4">About the Role</h2>
          <p>{job.description}</p>
        </section>

        {job.responsibilities && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Key Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {job.requirements && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 shrink-0"></div>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
};

export default JobDetails;
