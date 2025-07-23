import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Star } from 'react-feather';

const SkillsBlock = ({ skills }) => {
  const { technical, soft, tools } = skills || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const SkillCategory = ({ title, items, icon: Icon, color }) => (
    <motion.div 
      className="skill-category"
      variants={itemVariants}
    >
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={20} className={`${color}`} />
        </motion.div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items?.map((skill, index) => (
          <motion.span
            key={index}
            className={`px-3 py-1.5 rounded-full text-sm font-medium 
              ${title === 'Technical' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : ''}
              ${title === 'Tools' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' : ''}
              ${title === 'Soft Skills' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : ''}
              border border-transparent hover:border-current transition-all duration-200
            `}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );

  // Alternative layout with skill levels
  const SkillWithLevel = ({ name, level }) => (
    <motion.div 
      className="skill-item mb-4"
      variants={itemVariants}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{level}%</span>
      </div>
      <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </motion.div>
  );

  // If skills is an array of objects with levels
  if (Array.isArray(skills)) {
    return (
      <motion.div
        className="skills-block"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <SkillWithLevel key={index} name={skill.name} level={skill.level} />
          ))}
        </div>
      </motion.div>
    );
  }

  // If skills is categorized
  return (
    <motion.div
      className="skills-block space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {technical && (
        <SkillCategory 
          title="Technical" 
          items={technical} 
          icon={Zap} 
          color="text-blue-600 dark:text-blue-400"
        />
      )}
      {tools && (
        <SkillCategory 
          title="Tools" 
          items={tools} 
          icon={Star} 
          color="text-purple-600 dark:text-purple-400"
        />
      )}
      {soft && (
        <SkillCategory 
          title="Soft Skills" 
          items={soft} 
          icon={Star} 
          color="text-green-600 dark:text-green-400"
        />
      )}
    </motion.div>
  );
};

export default SkillsBlock;