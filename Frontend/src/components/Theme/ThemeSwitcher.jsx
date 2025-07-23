// components/ThemeSwitcher.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  FiCheck, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, themes, changeTheme } = useTheme();
  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
                className="fixed bottom-8 left-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50"
      >
        {/* <FiPalette className="w-6 h-6" /> */}
      </motion.button>

      {/* Theme Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Theme</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Theme Grid */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(themes).map(([id, theme]) => (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => changeTheme(id)}
                      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${
                        currentTheme === id ? 'ring-4 ring-blue-600' : 'hover:shadow-lg'
                      }`}
                    >
                      {/* Theme Preview */}
                      <div 
                        className="h-40 relative"
                        style={{
                          background: theme.colors.gradient.background,
                          color: theme.colors.text.primary
                        }}
                      >
                        {/* Preview Elements */}
                        <div className="p-4">
                          <div 
                            className="h-2 w-24 rounded mb-2"
                            style={{ background: theme.colors.gradient.primary }}
                          />
                          <div 
                            className="h-2 w-32 rounded mb-2"
                            style={{ background: theme.colors.secondary }}
                          />
                          <div className="flex gap-2 mt-4">
                            <div 
                              className="w-8 h-8 rounded"
                              style={{ background: theme.colors.accent }}
                            />
                            <div 
                              className="w-8 h-8 rounded"
                              style={{ background: theme.colors.primary }}
                            />
                          </div>
                        </div>

                        {/* Active Indicator */}
                        {currentTheme === id && (
                          <div className="absolute top-2 right-2 p-1 bg-white rounded-full">
                            <FiCheck className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                      </div>

                      {/* Theme Info */}
                      <div 
                        className="p-4"
                        style={{ 
                          backgroundColor: theme.colors.surface,
                          borderTop: `1px solid ${theme.colors.border}`
                        }}
                      >
                        <h3 
                          className="font-semibold mb-1"
                          style={{ color: theme.colors.text.primary }}
                        >
                          {theme.name}
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ color: theme.colors.text.secondary }}
                        >
                          {theme.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSwitcher;