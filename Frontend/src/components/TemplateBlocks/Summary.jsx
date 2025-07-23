import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight, Award, Target } from 'react-feather';
// import { SparklesIcon } from 'react-icons/hi'

const SummaryBlock = ({ summary }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle both string and object formats
  const content = typeof summary === 'string' ? summary : summary?.content || '';
  const highlights = summary?.highlights || [];
  const yearsExperience = summary?.yearsExperience;
  const specialization = summary?.specialization;

  // Split content into preview and full text
  const words = content.split(' ');
  const previewText = words.slice(0, 30).join(' ');
  const hasMore = words.length > 30;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="summary-block"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with icon */}
      <motion.div 
        className="flex items-center gap-3 mb-4"
        whileHover={{ x: 5 }}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <FileText className="text-blue-600 dark:text-blue-400" size={24} />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Professional Summary
        </h2>
      </motion.div>

      {/* Stats badges if available */}
      {(yearsExperience || specialization) && (
        <motion.div 
          className="flex flex-wrap gap-3 mb-6"
          variants={containerVariants}
        >
          {yearsExperience && (
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Award size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                {yearsExperience}+ Years Experience
              </span>
            </motion.div>
          )}
          {specialization && (
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target size={16} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
                {specialization}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Main content */}
      <motion.div className="relative">
        <AnimatePresence mode="wait">
          <motion.p 
            className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg"
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? content : `${previewText}${hasMore ? '...' : ''}`}
          </motion.p>
        </AnimatePresence>

        {hasMore && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:gap-2 transition-all duration-200"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Show less' : 'Read more'}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} />
            </motion.div>
          </motion.button>
        )}
      </motion.div>

      {/* Highlights section */}
      {highlights.length > 0 && (
        <motion.div 
          className="mt-6 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            {/* <SparklesIcon size={18} className="text-yellow-500" /> */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Key Highlights
            </h3>
          </div>
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-2"
              variants={highlightVariants}
              custom={index}
            >
              <motion.div
                className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
              />
              <p className="text-gray-600 dark:text-gray-300">
                {highlight}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SummaryBlock;