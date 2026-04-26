import React from 'react';
import { motion } from 'framer-motion';

const AuthForm = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden 
      bg-gradient-to-br from-gray-900 via-gray-800 to-black">

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-violet-500/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-32 left-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-fuchsia-500/30 rounded-full blur-[120px] animate-pulse" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 
          rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 
              rounded-2xl flex items-center justify-center mb-5 shadow-lg"
            >
              <span className="text-white font-bold text-lg sm:text-xl">H</span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="space-y-5 sm:space-y-6">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;