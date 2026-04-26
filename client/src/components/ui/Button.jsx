import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  fullWidth = false,
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-lg sm:rounded-xl transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 border';

  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent hover:shadow-lg hover:shadow-indigo-500/20 focus:ring-indigo-500',
    secondary:
      'bg-slate-800 text-gray-200 border-slate-700 hover:bg-slate-700 hover:border-slate-600 focus:ring-slate-500',
    outline:
      'bg-transparent text-indigo-400 border-indigo-500/50 hover:bg-indigo-500/10 focus:ring-indigo-500',
    ghost:
      'bg-transparent text-gray-300 border-transparent hover:bg-slate-800 focus:ring-slate-500',
  };

  const sizes = {
    sm: 'text-xs sm:text-sm px-3 sm:px-4 py-2',
    md: 'text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3',
    lg: 'text-base sm:text-lg px-5 sm:px-8 py-3 sm:py-4',
  };

  const isDisabled = disabled || isLoading;

  const interactiveStyles = isDisabled
    ? 'opacity-70 cursor-not-allowed'
    : 'hover:-translate-y-0.5 active:translate-y-0';

  return (
    <motion.button
      whileTap={!isDisabled ? { scale: 0.97 } : {}}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${interactiveStyles}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {/* Subtle hover overlay (lighter than before) */}
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg sm:rounded-xl"></span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {isLoading && (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        )}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;