// src/components/TemplatesGallery.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiExternalLink, FiHeart, FiEye, FiLayers,
  FiStar, FiTrendingUp, FiAward, FiZap
} from 'react-icons/fi';
import { 
  HiOutlineDesktopComputer, HiOutlineCode, 
  HiOutlineBriefcase, HiOutlineAcademicCap,
  HiOutlineColorSwatch, HiOutlinePhotograph
} from 'react-icons/hi';

const Templates= () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = [
    { id: 'all', name: 'All Templates', icon: <FiLayers />, count: 52 },
    { id: 'developer', name: 'Developer', icon: <HiOutlineCode />, count: 12 },
    { id: 'designer', name: 'Designer', icon: <HiOutlineColorSwatch />, count: 10 },
    { id: 'business', name: 'Business', icon: <HiOutlineBriefcase />, count: 8 },
    { id: 'student', name: 'Student', icon: <HiOutlineAcademicCap />, count: 6 },
    { id: 'creative', name: 'Creative', icon: <HiOutlinePhotograph />, count: 9 },
    { id: 'minimal', name: 'Minimal', icon: <HiOutlineDesktopComputer />, count: 7 }
  ];

  const templates = [
    {
      id: 1,
      name: 'Modern Developer Pro',
      category: 'developer',
      image: 'https://via.placeholder.com/400x500/4F46E5/ffffff?text=Developer+Pro',
      preview: 'https://demo.portfolio.com/developer-pro',
      isPro: false,
      isNew: true,
      isTrending: true,
      views: 15420,
      rating: 4.9,
      features: ['Dark Mode', 'GitHub Integration', 'Code Showcase', 'Blog Section'],
      colors: ['#4F46E5', '#7C3AED', '#EC4899'],
      description: 'Perfect for developers who want to showcase their coding skills and projects.'
    },
    {
      id: 2,
      name: 'Creative Designer Portfolio',
      category: 'designer',
      image: 'https://via.placeholder.com/400x500/EC4899/ffffff?text=Designer+Portfolio',
      preview: 'https://demo.portfolio.com/creative-designer',
      isPro: true,
      isNew: false,
      isTrending: true,
      views: 12300,
      rating: 4.8,
      features: ['Gallery Showcase', 'Animation Effects', 'Client Testimonials', 'Contact Form'],
      colors: ['#EC4899', '#F59E0B', '#10B981'],
      description: 'Stunning portfolio for designers, artists, and creative professionals.'
    },
    {
      id: 3,
      name: 'Business Executive',
      category: 'business',
      image: 'https://via.placeholder.com/400x500/059669/ffffff?text=Business+Executive',
      preview: 'https://demo.portfolio.com/business-executive',
      isPro: false,
      isNew: false,
      isTrending: false,
      views: 8900,
      rating: 4.7,
      features: ['Professional Layout', 'Timeline View', 'Achievement Showcase', 'PDF Export'],
      colors: ['#059669', '#0891B2', '#1F2937'],
      description: 'Professional and clean design for business executives and consultants.'
    },
    {
      id: 4,
      name: 'Minimal Elegance',
      category: 'minimal',
      image: 'https://via.placeholder.com/400x500/6B7280/ffffff?text=Minimal+Elegance',
      preview: 'https://demo.portfolio.com/minimal-elegance',
      isPro: false,
      isNew: true,
      isTrending: false,
      views: 6700,
      rating: 4.6,
      features: ['Clean Design', 'Typography Focus', 'White Space', 'Mobile First'],
      colors: ['#000000', '#FFFFFF', '#6B7280'],
      description: 'Minimalist design that lets your content speak for itself.'
    },
    {
      id: 5,
      name: 'Student Starter',
      category: 'student',
      image: 'https://via.placeholder.com/400x500/3B82F6/ffffff?text=Student+Starter',
      preview: 'https://demo.portfolio.com/student-starter',
      isPro: false,
      isNew: false,
      isTrending: true,
      views: 10200,
      rating: 4.8,
      features: ['Education Timeline', 'Project Showcase', 'Skills Chart', 'Certifications'],
      colors: ['#3B82F6', '#10B981', '#F59E0B'],
      description: 'Perfect for students and fresh graduates entering the job market.'
    },
    {
      id: 6,
      name: 'Creative Freelancer',
      category: 'creative',
      image: 'https://via.placeholder.com/400x500/8B5CF6/ffffff?text=Creative+Freelancer',
      preview: 'https://demo.portfolio.com/creative-freelancer',
      isPro: true,
      isNew: true,
      isTrending: false,
      views: 7800,
      rating: 4.9,
      features: ['Portfolio Grid', 'Service Packages', 'Client Reviews', 'Booking System'],
      colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
      description: 'Vibrant and dynamic template for freelancers and creative agencies.'
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const toggleFavorite = (templateId) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4"
          >
            <FiLayers className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Perfect{' '}
            <span className="gradient-text">Template</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional templates designed by experts. Customizable to match your unique style and industry.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                  ${selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }
                `}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'}
                `}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredTemplate(template.id)}
              onHoverEnd={() => setHoveredTemplate(null)}
              className="group relative"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Template Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredTemplate === template.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6"
                  >
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-2xl font-bold mb-2">{template.name}</h3>
                      <p className="text-white/80 text-sm mb-4">{template.description}</p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setSelectedTemplate(template)}
                          className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <FiEye className="w-4 h-4" />
                          Preview
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2">
                          Use Template
                          <FiExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {template.isNew && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        NEW
                      </span>
                    )}
                    {template.isTrending && (
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <FiTrendingUp className="w-3 h-3" />
                        TRENDING
                      </span>
                    )}
                    {template.isPro && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <FiAward className="w-3 h-3" />
                        PRO
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors group/fav"
                  >
                    <FiHeart 
                      className={`w-5 h-5 transition-colors ${
                        favorites.includes(template.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-600 group-hover/fav:text-red-500'
                      }`}
                      // src/components/TemplatesGallery.jsx (continued)
                    />
                  </button>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{template.rating}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 3).map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{template.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Color Palette */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {template.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <FiEye className="w-4 h-4" />
                      <span>{template.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300">
            Load More Templates
          </button>
        </motion.div>
      </div>

      {/* Template Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <TemplatePreviewModal 
            template={selectedTemplate}
            onClose={() => setSelectedTemplate(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Template Preview Modal Component
const TemplatePreviewModal = ({ template, onClose }) => {
  const [activeDevice, setActiveDevice] = useState('desktop');

  const devices = [
    { id: 'desktop', icon: <HiOutlineDesktopComputer className="w-5 h-5" />, width: '100%' },
    { id: 'tablet', icon: <FiTablet className="w-5 h-5" />, width: '768px' },
    { id: 'mobile', icon: <FiSmartphone className="w-5 h-5" />, width: '375px' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{template.name}</h3>
            <p className="text-gray-600 mt-1">{template.description}</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Device Switcher */}
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-inner">
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setActiveDevice(device.id)}
                  className={`
                    p-2 rounded-md transition-all duration-200
                    ${activeDevice === device.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {device.icon}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-gray-100 p-8 h-[60vh] overflow-auto">
          <motion.div
            key={activeDevice}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mx-auto transition-all duration-500"
            style={{ maxWidth: devices.find(d => d.id === activeDevice)?.width }}
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <img 
                src={template.image} 
                alt={template.name}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FiEye className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">{template.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2">
              <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-gray-600">{template.rating} rating</span>
            </div>
            <div className="flex gap-1">
              {template.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2">
              Use This Template
              <FiZap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Missing imports
import { FiTablet, FiX } from 'react-icons/fi';

export default Templates;