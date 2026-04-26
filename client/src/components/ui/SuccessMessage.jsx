import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessMessage = ({ title, message, linkTo = "/", linkText = "Return Home" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 md:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center shadow-lg shadow-emerald-500/10"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4"
      >
        <CheckCircle className="w-8 h-8" />
      </motion.div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-emerald-100/70 text-sm mb-6 max-w-sm">
        {message}
      </p>

      <Link 
        to={linkTo}
        className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors group"
      >
        {linkText}
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default SuccessMessage;
