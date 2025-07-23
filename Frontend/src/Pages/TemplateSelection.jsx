// src/pages/TemplateSelection.jsx
import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Check, Eye, ArrowRight, Loader } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext, useAuth } from '../context/AuthContext';
import api from '../api';
const templates = [
  {
    id: 'cascade',
    name: 'Cascade',
    description: 'A polished, professional layout ideal for corporate roles.',
    preview: 'https://res.cloudinary.com/dp3tbvvvv/image/upload/c_fill,ar_4:3,g_auto/v1753221530/Cascade_n9jjfg.png',
    features: ['Full-width Hero', 'Two-Column Grid', 'Contact Form', 'Light Theme (Blue & Grey)'],
    category: 'Professional'
  },
  {
    id: 'nova',
    name: 'Nova',
    description: 'A bold, modern design that uses full-screen sections for a big impact.',
    preview: 'https://res.cloudinary.com/dp3tbvvvv/image/upload/c_fill,ar_4:3,g_auto/v1753221530/Nova_vfmwgn.png',
    features: ['Full-Screen Panels', 'Snap-Scroll Transitions', 'Dark Theme', 'Vibrant Accent Color'],
    category: 'Modern'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    description: 'An elegant, minimalist design inspired by Japanese aesthetics and whitespace.',
    preview: 'https://res.cloudinary.com/dp3tbvvvv/image/upload/c_fill,ar_4:3,g_auto/v1753221529/Kyoto_bqikx1.png',
    features: ['Fixed Sidebar Navigation', 'Minimalist Layout', 'Subtle Fade-in Animations', 'Serif Fonts'],
    category: 'Minimalist'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'A creative layout that mimics a command-line interface, perfect for developers.',
    preview: 'https://res.cloudinary.com/dp3tbvvvv/image/upload/c_fill,ar_4:3,g_auto/v1753221528/Terminal_kgsypy.png',
    features: ['Terminal Interface', 'Command-Based Sections', 'Monospace Font', 'Blinking Cursor Effect'],
    category: 'Technical'
  },
  {
    id: 'gallery',
    name: 'The Gallery',
    description: 'A visually-driven layout perfect for designers, artists, and photographers where the work takes center stage.',
    preview: 'https://res.cloudinary.com/dp3tbvvvv/image/upload/c_fill,ar_4:3,g_auto/v1753221528/Gallery_ltrgeu.png',
    features: ['Image-First Design', 'Masonry Project Grid', 'Minimal UI', 'Elegant Typography'],
    category: 'Creative'
  },
  {
    id: 'infographic',
    name: 'The Infographic',
    description: 'A creative and colorful single-page layout that presents the resume as a modern, engaging infographic.',
    preview: 'https://res.cloudinary.com/dp3tbvvvv/image/upload/c_fill,ar_4:3/v1753221531/Infographic_gv4m1h.png',
    features: ['Infographic Style', 'Vertical Experience Timeline', 'Data-Driven Charts', 'Heavy Animations'],
    category: 'Creative'
  }
];

const TemplateSelection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [devicePreview, setDevicePreview] = useState('desktop');
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState('All');
  
  const { currentTheme } = useContext(ThemeContext);
  const {user}=useAuth();

  
  const navigate = useNavigate();

  useEffect(() => {
    // Get parsed resume data from session storage
      const data=sessionStorage.getItem('parsedResumeData');
      if(data){
        setResumeData(JSON.parse(data));
      } else {
        navigate('/upload')
      }

  }, [navigate]);

  const categories = ['All', 'Professional', 'Creative', 'Minimal', 'Technical', 'Executive', 'Business'];

  const filteredTemplates = filter === 'All' 
    ? templates 
    : templates.filter(template => template.category === filter);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleCreatePortfolio = async () => {
    // console.log(selectedTemplate);
    // console.log(resumeData);
    if (!selectedTemplate || !resumeData) return;
    
    setCreating(true);
    
    try {

      localStorage.setItem('selectedTemplate', JSON.stringify(selectedTemplate));

      await new Promise(resolve => setTimeout(resolve, 3000));
      // console.log(user);
      const response=await api.post(`/api/portfolio/${selectedTemplate.name}/${user?._id}`);
      // Redirect to customization page
      // console.log(response);
      navigate('/portfolio-link');
      
    } catch (error) {
      console.error('Failed to create portfolio:', error);
      setCreating(false);
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${currentTheme.bgClass} transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${currentTheme.primary}`}>
            Choose Your Template
          </h1>
          <p className={`text-lg ${currentTheme.text} opacity-80 mb-8`}>
            Select a template that best represents your professional style
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${filter === category 
                    ? `${currentTheme.buttonBg} ${currentTheme.buttonText}` 
                    : `${currentTheme.cardBg} ${currentTheme.text} hover:opacity-80`}`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${currentTheme.cardBg} rounded-xl overflow-hidden ${currentTheme.cardShadow}
                ${selectedTemplate?.id === template.id ? 'ring-2 ring-offset-2 ' + currentTheme.ringColor : ''}
                cursor-pointer transform hover:scale-105 transition-all duration-300`}
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Template Preview Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900">
                <img 
                  src={template.preview} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {selectedTemplate?.id === template.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                )}
                
              </div>
              
              {/* Template Info */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${currentTheme.text}`}>
                  {template.name}
                </h3>
                <p className={`text-sm ${currentTheme.text} opacity-70 mb-4`}>
                  {template.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature, i) => (
                    <span 
                      key={i}
                      className={`text-xs px-2 py-1 rounded-full ${currentTheme.tagBg} ${currentTheme.tagText}`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={handleCreatePortfolio}
              disabled={creating}
              className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-8 py-4 
                rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center`}
            >
              {creating ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Creating Portfolio...
                </>
              ) : (
                <>
                  Create Portfolio
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Preview Modal */}
        <AnimatePresence>
          {showPreview && selectedTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                className={`${currentTheme.cardBg} rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Preview Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-2xl font-bold ${currentTheme.text}`}>
                    {selectedTemplate.name} Preview
                  </h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`p-2 rounded-lg ${currentTheme.cardBg} hover:opacity-80 transition-opacity`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Device Preview Selector */}
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={() => setDevicePreview('desktop')}
                    className={`p-3 rounded-lg ${devicePreview === 'desktop' 
                      ? currentTheme.buttonBg + ' ' + currentTheme.buttonText 
                      : currentTheme.cardBg + ' ' + currentTheme.text}`}
                  >
                    <Monitor className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDevicePreview('tablet')}
                    className={`p-3 rounded-lg ${devicePreview === 'tablet' 
                      ? currentTheme.buttonBg + ' ' + currentTheme.buttonText 
                      : currentTheme.cardBg + ' ' + currentTheme.text}`}
                  >
                    <Tablet className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDevicePreview('mobile')}
                    className={`p-3 rounded-lg ${devicePreview === 'mobile' 
                      ? currentTheme.buttonBg + ' ' + currentTheme.buttonText 
                      : currentTheme.cardBg + ' ' + currentTheme.text}`}
                  >
                    <Smartphone className="w-5 h-5" />
                  </button>
                </div>

                {/* Preview Frame */}
                <div className={`mx-auto transition-all duration-300 ${
                  devicePreview === 'desktop' ? 'max-w-full' :
                  devicePreview === 'tablet' ? 'max-w-md' : 'max-w-xs'
                }`}>
                  <div className={`${currentTheme.cardBg} rounded-lg overflow-hidden shadow-2xl`}>
                    <img 
                      src={selectedTemplate.preview} 
                      alt={selectedTemplate.name}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Template Details */}
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`font-semibold mb-2 ${currentTheme.text}`}>Description</h4>
                    <p className={`${currentTheme.text} opacity-70`}>
                      {selectedTemplate.description}
                    </p>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${currentTheme.text}`}>Features</h4>
                    <ul className="space-y-2">
                      {selectedTemplate.features.map((feature, i) => (
                        <li key={i} className={`flex items-center ${currentTheme.text} opacity-70`}>
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`px-6 py-2 rounded-lg ${currentTheme.cardBg} ${currentTheme.text} 
                      hover:opacity-80 transition-opacity`}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowPreview(false);
                      handleCreatePortfolio();
                    }}
                    className={`px-6 py-2 rounded-lg ${currentTheme.buttonBg} ${currentTheme.buttonText} 
                      hover:opacity-90 transition-opacity`}
                  >
                    Use This Template
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TemplateSelection;