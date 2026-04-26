import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const ApplyButton = ({ jobId, onSimulateApply }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { user, token } = useAuth(); // Need user context and auth token

  const handleApply = async () => {
    if (isApplying || hasApplied) return;

    if (!user) {
      setErrorMsg("You must be logged in to apply.");
      return;
    }

    setIsApplying(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error executing job application process.');
      }

      setHasApplied(true);
      if (onSimulateApply) onSimulateApply();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">

        {/* 🔹 Apply Button */}
        {!hasApplied ? (
          <motion.div
            key="apply-btn"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={isApplying}
              isLoading={isApplying}
              onClick={handleApply}
              className="
                group flex items-center justify-center
                text-sm sm:text-base
                py-2.5 sm:py-3
              "
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 
                group-hover:translate-x-1 group-hover:-translate-y-1 
                transition-transform duration-300" />

              {isApplying ? 'Submitting...' : 'Apply Now'}
            </Button>
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-red-400 flex items-center justify-center p-2 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <AlertCircle className="w-4 h-4 mr-1.5 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </motion.div>
        ) : (

          /* 🔹 Success State */
          <motion.div
            key="success-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="w-full"
          >
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              disabled
              className="
                bg-emerald-500/10 text-emerald-400 border-emerald-500/30
                flex items-center justify-center
                text-sm sm:text-base
                py-2.5 sm:py-3
              "
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
                className="flex items-center"
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Applied Successfully
              </motion.span>
            </Button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ApplyButton;