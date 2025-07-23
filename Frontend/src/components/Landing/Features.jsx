// src/components/Features.jsx
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
   FiLayers, FiSmartphone,  
   FiZap, FiEdit3,FiShare2,FiLayout,
  FiCpu, FiCopy, FiRefreshCw
} from 'react-icons/fi';
import { 
  HiOutlineSparkles, HiOutlineTemplate, 
  HiOutlineChartBar, HiOutlineLightningBolt 
} from 'react-icons/hi';

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {user}=useAuth();
  const navigate=useNavigate();
  const categories = [
    { id: 'all', name: 'All Features', icon: <FiLayers /> },
    { id: 'ai', name: 'AI Powered', icon: <HiOutlineSparkles /> },
    { id: 'design', name: 'Design', icon: <HiOutlineTemplate /> },
    { id: 'analytics', name: 'Analytics', icon: <HiOutlineChartBar /> },
    { id: 'performance', name: 'Performance', icon: <HiOutlineLightningBolt /> }
  ];

 const features = [
  {
    icon: <FiCpu className="w-6 h-6" />,
    title: "AI Content Enhancement",
    description: "Our AI enhances your content by suggesting industry-specific, ATS-friendly keywords to get your portfolio past automated screeners.",
    category: 'ai',
    color: 'from-blue-500 to-cyan-500',
    benefits: ['ATS-friendly keywords', 'Content analysis', 'Industry-specific terms']
  },
  {
    icon: <HiOutlineTemplate className="w-6 h-6" />,
    title: "Professional Templates",
    description: "Choose from a wide variety of stunning, professionally designed templates to make your portfolio stand out.",
    category: 'design',
    color: 'from-purple-500 to-pink-500',
    benefits: ['Modern layouts', 'Fully customizable', 'Multiple styles']
  },
  {
    icon: <FiSmartphone className="w-6 h-6" />,
    title: "Fully Responsive Design",
    description: "Your portfolio is guaranteed to look perfect on any device, from mobile phones and tablets to large desktop screens.",
    category: 'design',
    color: 'from-green-500 to-teal-500',
    benefits: ['Mobile-first approach', 'Adapts to any screen', 'Touch-friendly interface']
  },
  {
    icon: <FiZap className="w-6 h-6" />,
    title: "Lightning Fast Performance",
    description: "Built with modern technology for blazing-fast load times, ensuring a smooth experience for visitors and better SEO.",
    category: 'performance',
    color: 'from-yellow-500 to-orange-500',
    benefits: ['Optimized for speed', 'Instant loading', 'Global CDN']
  },
  {
    icon: <FiEdit3 className="w-6 h-6" />,
    title: "Uniquely Yours",
    description: "Extensive customization options let you tailor every aspect of your portfolio to perfectly match your personal brand.",
    category: 'design',
    color: 'from-pink-500 to-rose-500',
    benefits: ['Full color control', 'Custom fonts', 'Unique layouts']
  },
  {
    icon: <FiShare2 className="w-6 h-6" />,
    title: "One-Click Sharing",
    description: "Easily share your portfolio with a single click, generating a unique link for recruiters, social media, or your email signature.",
    category: 'performance',
    color: 'from-emerald-500 to-green-500',
    benefits: ['Sharable links', 'QR code generation', 'Social media integration']
  },
  {
    icon: <FiLayout className="w-6 h-6" />,
    title: "Personal Dashboard",
    description: "Manage your portfolio, track visitor analytics, and see who's viewing your profile all from one centralized dashboard.",
    category: 'analytics',
    color: 'from-indigo-500 to-purple-500',
    benefits: ['Visitor tracking', 'Engagement metrics', 'Centralized management']
  },
  {
    icon: <FiCopy className="w-6 h-6" />,
    title: "Multiple Portfolio Versions",
    description: "Create and manage different versions of your portfolio, tailored for specific job applications or industries.",
    category: 'design',
    color: 'from-gray-500 to-gray-600',
    benefits: ['Tailor for jobs', 'A/B testing versions', 'Industry-specific focus']
  },
  {
    icon: <FiRefreshCw className="w-6 h-6" />,
    title: "Seamless Resume Integration",
    description: "Your online portfolio automatically syncs with your resume data. Update once, and it reflects everywhere.",
    category: 'performance',
    color: 'from-sky-500 to-blue-500',
    benefits: ['Update once, apply everywhere', 'Consistent branding', 'Always in sync']
  }
];

  const filteredFeatures = (selectedCategory === 'all')
  ? features
  : features.filter(feature => feature.category === selectedCategory);
  

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
  const handleClick=()=>{
      if(!user){
        navigate('/login');
      }else{
        navigate('/dashboard');
      }
  }

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4"
          >
            <FiLayers className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Stand Out</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to help you create a portfolio that gets you hired. 
            No compromises, no limitations.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                ${selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }
              `}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`
                    w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} 
                    flex items-center justify-center text-white mb-6
                    group-hover:scale-110 transition-transform duration-300
                  `}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : -20
                      }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      {benefit}
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect Background */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
                  group-hover:opacity-5 transition-opacity duration-300 rounded-2xl
                `}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Ready to experience the future of portfolio building?
          </p>
          <button className="button-primary group" onClick={handleClick}>
            Start Building for Free
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  )
};
export default Features;