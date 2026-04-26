import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full group">

      {/* Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Search jobs, companies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="
          w-full
          bg-slate-900/80 backdrop-blur-xl
          border border-slate-700
          hover:border-slate-500
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
          rounded-xl sm:rounded-2xl
          py-2.5 sm:py-3
          pl-9 sm:pl-12 pr-3 sm:pr-4
          text-gray-200 text-sm sm:text-base
          placeholder:text-gray-500
          outline-none
          transition-all duration-200
          shadow-md hover:shadow-lg
        "
      />

    </div>
  );
};

export default SearchBar;