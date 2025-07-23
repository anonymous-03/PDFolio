import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'react-feather';

const PersonalInfoBlock = ({ data,variant='default' }) => {
  const { name, title, location } = data || {};
  
  return (
    <motion.div 
      className="personal-info-block "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1 
        className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {name} 
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {title}
      </motion.p>
      <motion.div 
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <MapPin size={18} />
        <p className="text-lg">{location}</p>
      </motion.div>
    </motion.div>
  );
};

export default PersonalInfoBlock;