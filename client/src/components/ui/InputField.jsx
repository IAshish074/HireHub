import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const InputField = ({
  label,
  id,
  type = 'text',
  error,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  icon: Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>

      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`text-xs sm:text-sm font-medium transition-colors ${
            error ? 'text-red-400' : 'text-gray-300 focus-within:text-indigo-400'
          }`}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative group">

        {/* Left Icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}

        {/* Input */}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            w-full
            bg-slate-900/80 backdrop-blur-md
            border rounded-lg sm:rounded-xl
            px-3 sm:px-4 py-2.5 sm:py-3
            text-sm sm:text-base text-gray-200
            placeholder:text-gray-500
            outline-none transition-all duration-200

            ${Icon ? 'pl-9 sm:pl-10' : ''}
            ${isPassword ? 'pr-10 sm:pr-12' : error ? 'pr-9 sm:pr-10' : ''}

            ${
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-slate-700 hover:border-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'
            }
          `}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 
              text-gray-400 hover:text-gray-200 
              p-1 rounded-md transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        )}

        {/* Error Icon */}
        {!isPassword && error && (
          <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-red-400">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-400 text-xs sm:text-sm font-medium mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputField;