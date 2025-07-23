import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'react-feather';

const ProjectCard = ({ project, index = 0 }) => {
  const { name, description, tech } = project || {};
  
  return (
    <motion.div 
      className="project-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <motion.h3 
          className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          layoutId={`project-title-${index}`}
        >
          {name}
        </motion.h3>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ExternalLink 
            size={20} 
            className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" 
          />
        </motion.div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tech?.map((item, idx) => (
          <motion.span 
            key={idx} 
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <Code size={14} />
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;