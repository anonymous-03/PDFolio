import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'react-feather';

const ExperienceItem = ({ experience, index = 0 }) => {
  const { title, company, period, description } = experience || {};
  
  return (
    <motion.div 
      className="experience-item relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <motion.div 
        className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-white dark:ring-gray-900"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
      />
      
      <motion.h3 
        className="text-xl font-semibold text-gray-900 dark:text-white mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.1 }}
      >
        {title}
      </motion.h3>
      
      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-3">
        <motion.div 
          className="flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
        >
          <Briefcase size={16} />
          <span className="font-medium">{company}</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
        >
          <Calendar size={16} />
          <span className="text-sm">{period}</span>
        </motion.div>
      </div>
      
      <motion.p 
        className="text-gray-600 dark:text-gray-300 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.2 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default ExperienceItem;