// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { user,logout } = useAuth();

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#process' },
    { name: 'Contact Us', href: '#contact' },
    // { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled
          ? 'glass-effect shadow-lg py-4'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              PDF<span className="gradient-text">olio</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-4"
            >
              {user ? (<button className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={() => 
                logout()
              }>
                Logout
              </button>) : (
                <>
                  <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={() => {
                    navigate('/login');
                  }}>
                    Sign In
                  </button>
                  <button className="button-primary" onClick={() => {
                    navigate('/login');
                  }}>
                    Get Started Free
                  </button>
                </>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <div className="w-6 flex flex-col space-y-1.5">
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 8 : 0
                }}
                className="w-full h-0.5 bg-gray-800 rounded-full transition-all"
              />
              <motion.span
                animate={{
                  opacity: isMenuOpen ? 0 : 1
                }}
                className="w-full h-0.5 bg-gray-800 rounded-full transition-all"
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -8 : 0
                }}
                className="w-full h-0.5 bg-gray-800 rounded-full transition-all"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  {user ? (<button className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={() =>logout()}>
                Logout
              </button>) : (
                <>
                  <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors" onClick={() => {
                    navigate('/login');
                  }}>
                    Sign In
                  </button>
                  <button className="button-primary" onClick={() => {
                    navigate('/login');
                  }}>
                    Get Started Free
                  </button>
                </>
              )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;