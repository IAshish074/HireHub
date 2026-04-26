import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Menu, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 z-40 
      bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">

      <div className="h-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 
        flex items-center justify-between">

        {/* 🔹 Left */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-400 hover:text-white lg:hidden 
            rounded-lg hover:bg-slate-800 transition-colors 
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
              flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <span className="text-white font-bold text-sm">H</span>
            </div>

            {/* Show text on md+ instead of sm */}
            <span className="hidden md:block text-lg font-semibold text-white tracking-tight">
              HireHuB
            </span>
          </Link>
        </div>

        {/* 🔹 Right */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification */}
          <button className="relative p-2 text-gray-400 hover:text-white 
            rounded-lg hover:bg-slate-800 transition 
            focus:outline-none focus:ring-2 focus:ring-indigo-500">

            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full border border-slate-900" />
          </button>

          {/* Profile */}
          <div className="relative">

            <button
              onClick={() => setShowDropdown(prev => !prev)}
              className="flex items-center gap-2 p-1 pl-2 pr-2 sm:pr-3 
              bg-slate-800/60 hover:bg-slate-800 
              rounded-full border border-slate-700 
              transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-500/20 
                flex items-center justify-center text-indigo-400">
                <User className="w-4 h-4" />
              </div>

              <span className="hidden sm:block text-sm text-gray-200 
                max-w-[90px] truncate">
                {user?.name || 'User'}
              </span>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                  />

                  {/* Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 sm:w-48 
                    rounded-xl bg-slate-900/95 backdrop-blur-xl 
                    border border-slate-700 shadow-xl z-50 overflow-hidden"
                  >

                    {/* User Info */}
                    <div className="px-3 sm:px-4 py-3 border-b border-slate-800">
                      <p className="text-sm text-white font-medium truncate">
                        {user?.name || 'Guest User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user?.email || 'guest@hirehub.com'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="p-1.5">
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm 
                        text-gray-300 hover:text-white hover:bg-slate-800 
                        rounded-lg transition"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm 
                        text-red-400 hover:text-red-300 hover:bg-slate-800 
                        rounded-lg transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>

                  </motion.div>
                </>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;