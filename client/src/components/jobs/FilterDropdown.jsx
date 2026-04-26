import React from 'react';
import { Filter } from 'lucide-react';

const FilterDropdown = ({ filter, setFilter }) => {
  const options = ['All', 'Full-Time', 'Part-Time', 'Contract', 'Internship'];

  return (
    <div className="relative w-full sm:w-auto">
      
      {/* Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Select */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="
          w-full sm:min-w-[180px] md:min-w-[200px]
          appearance-none
          bg-slate-900/80 backdrop-blur-xl
          border border-slate-700
          hover:border-slate-500
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
          rounded-xl sm:rounded-2xl
          py-2.5 sm:py-3
          pl-9 sm:pl-10 pr-9 sm:pr-10
          text-gray-200 text-sm sm:text-base font-medium
          outline-none transition-all duration-200
          shadow-md hover:shadow-lg
          cursor-pointer
        "
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-800 text-white">
            {opt}
          </option>
        ))}
      </select>

      {/* Dropdown Arrow */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </div>
  );
};

export default FilterDropdown;