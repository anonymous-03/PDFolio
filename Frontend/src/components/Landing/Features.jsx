// src/components/Features.jsx
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, FiLayers, FiSmartphone, FiGlobe, 
  FiShield, FiZap, FiEdit3, FiTrendingUp,
  FiCpu, FiDownload, FiSearch, FiUsers
} from 'react-icons/fi';
import { 
  HiOutlineSparkles, HiOutlineTemplate, 
  HiOutlineChartBar, HiOutlineLightningBolt 
} from 'react-icons/hi';

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      description: "Our AI analyzes your resume and suggests improvements, generates compelling summaries, and optimizes keywords for ATS systems.",
      category: 'ai',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Smart keyword optimization', 'ATS-friendly formatting', 'Industry-specific suggestions']
    },
    {
      icon: <HiOutlineTemplate className="w-6 h-6" />,
      title: "50+ Professional Templates",
      description: "Choose from a wide variety of stunning, industry-specific templates designed by professionals.",
      category: 'design',
      color: 'from-purple-500 to-pink-500',
      benefits: ['Modern designs', 'Customizable layouts', 'Industry-specific themes']
    },
    {
      icon: <FiSmartphone className="w-6 h-6" />,
      title: "Mobile-First Design",
      description: "Every portfolio is optimized for all devices, ensuring perfect presentation on phones, tablets, and desktops.",
      category: 'design',
      color: 'from-green-500 to-teal-500',
      benefits: ['Responsive layouts', 'Touch-friendly', 'Fast loading']
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Custom Domain Support",
      description: "Connect your own domain or use our free subdomain. Full SSL certificates included.",
      category: 'performance',
      color: 'from-orange-500 to-red-500',
      benefits: ['Free SSL certificate', 'Easy DNS setup', 'Multiple domains']
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track visitors, page views, and engagement metrics. Know which companies viewed your portfolio.",
      category: 'analytics',
      color: 'from-indigo-500 to-purple-500',
      benefits: ['Real-time tracking', 'Visitor insights', 'Conversion metrics']
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Privacy & Security",
      description: "Your data is encrypted and secure. Control who sees your portfolio with advanced privacy settings.",
      category: 'performance',
      color: 'from-gray-600 to-gray-800',
      benefits: ['End-to-end encryption', 'Password protection', 'GDPR compliant']
    },
    {
      icon: <FiEdit3 className="w-6 h-6" />,
      title: "Easy Customization",
      description: "No coding required. Edit everything with our intuitive drag-and-drop editor.",
      category: 'design',
      color: 'from-pink-500 to-rose-500',
      benefits: ['Drag-and-drop editor', 'Live preview', 'Unlimited revisions']
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Built on cutting-edge technology for blazing-fast load times and optimal SEO performance.",
      category: 'performance',
      color: 'from-yellow-500 to-orange-500',
      benefits: ['CDN hosting', 'Optimized images', 'Lazy loading']
    },
    {
      icon: <FiSearch className="w-6 h-6" />,
      title: "SEO Optimized",
      description: "Built-in SEO tools help your portfolio rank higher in search results and get discovered.",
      category: 'analytics',
      color: 'from-cyan-500 to-blue-500',
      benefits: ['Meta tags optimization', 'Sitemap generation', 'Schema markup']
    },
    {
      icon: <FiDownload className="w-6 h-6" />,
      title: "Export Options",
      description: "Download your portfolio as PDF, generate QR codes, or share via custom links.",
      category: 'performance',
      color: 'from-emerald-500 to-green-500',
      benefits: ['PDF export', 'QR code generation', 'Share links']
    },
    {
      icon: <HiOutlineSparkles className="w-6 h-6" />,
      title: "AI Writing Assistant",
      description: "Get help writing compelling descriptions, summaries, and project details with our AI assistant.",
      category: 'ai',
      color: 'from-violet-500 to-purple-500',
      benefits: ['Content suggestions', 'Grammar check', 'Tone adjustment']
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Invite team members to review and provide feedback on your portfolio before publishing.",
      category: 'analytics',
      color: 'from-blue-500 to-indigo-500',
      benefits: ['Real-time collaboration', 'Comments & feedback', 'Version history']
    }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(f => f.category === selectedCategory);

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
          <button className="button-primary group">
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