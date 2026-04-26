import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, XCircle, Info } from 'lucide-react';

const ErrorMessage = ({ message, type = 'error', onClose }) => {
  if (!message) return null;

  const styles = {
    error: 'bg-red-500/10 border-red-500/40 text-red-400',
    warning: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
    info: 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400',
  };

  const icons = {
    error: <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
    warning: <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />,
    info: <Info className="w-4 h-4 sm:w-5 sm:h-5" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className={`
          w-full max-w-xl mx-auto
          flex items-start gap-3
          p-3 sm:p-4
          rounded-lg sm:rounded-xl
          border backdrop-blur-md shadow-md
          ${styles[type]}
        `}
        role="alert"
      >
        {/* Icon */}
        <div className="shrink-0 mt-0.5">
          {icons[type]}
        </div>

        {/* Message */}
        <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
          {message}
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="
              shrink-0 p-1.5 rounded-md
              text-current opacity-70 hover:opacity-100
              hover:bg-white/10
              transition
              focus:outline-none focus:ring-2 focus:ring-white/20
            "
          >
            <span className="sr-only">Dismiss</span>
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;