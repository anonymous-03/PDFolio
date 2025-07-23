import React from 'react';
import { motion } from 'framer-motion';
import { GitHub, Linkedin, Twitter, Heart } from 'react-feather';

const FooterBlock = ({ socials }) => {
  const currentYear = new Date().getFullYear();
  const { linkedin, github, twitter } = socials || {};
  
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: linkedin, color: 'hover:text-blue-600' },
    { name: 'GitHub', icon: GitHub, url: github, color: 'hover:text-gray-900 dark:hover:text-white' },
    { name: 'Twitter', icon: Twitter, url: twitter, color: 'hover:text-sky-500' },
  ].filter(link => link.url);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="footer-block py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
        <motion.div 
          className="flex items-center gap-6"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 dark:text-gray-400 ${link.color} transition-all duration-200`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.name}
              >
                <Icon size={24} />
              </motion.a>
            );
          })}
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm"
          variants={itemVariants}
        >
          <span>© {currentYear} All rights reserved</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Heart size={16} className="text-red-500 fill-current" />
          </motion.span>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default FooterBlock;