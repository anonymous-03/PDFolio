// components/TestimonialsSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiStar, 
  FiChevronLeft, 
  FiChevronRight,
  FiLinkedin,
  FiTwitter,
  FiGlobe,
  FiMessageCircle
} from 'react-icons/fi';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      text: 'ResumeBuildr transformed my outdated PDF resume into a stunning portfolio website in minutes. The AI accurately extracted all my information and the template selection is incredible. I\'ve received multiple job offers since launching my new portfolio!',
      portfolioUrl: '#',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      tag: 'Developer'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'UX/UI Designer',
      company: 'Creative Studios',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 5,
      text: 'As a designer, I\'m very particular about aesthetics. ResumeBuildr exceeded my expectations with its modern templates and customization options. The ability to showcase my portfolio pieces alongside my resume is game-changing.',
      portfolioUrl: '#',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      tag: 'Designer'
    },
    {
      id: 3,
      name: 'Emily Thompson',
      role: 'Marketing Manager',
      company: 'Growth Dynamics',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
      text: 'I\'m not tech-savvy, but ResumeBuildr made it incredibly easy to create a professional online presence. The step-by-step process and AI assistance meant I had a beautiful portfolio site live within 30 minutes!',
      portfolioUrl: '#',
      social: {
        linkedin: '#'
      },
      tag: 'Marketer'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Data Scientist',
      company: 'Analytics Pro',
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      rating: 5,
      text: 'The analytics features are fantastic! I can track who\'s viewing my portfolio and which projects get the most attention. This data has helped me optimize my portfolio for better engagement.',
      portfolioUrl: '#',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      tag: 'Data Scientist'
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      role: 'Freelance Photographer',
      company: 'JM Photography',
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
      rating: 5,
      text: 'Finally, a platform that understands creatives! The gallery templates are perfect for showcasing my photography work. The custom domain feature gives me the professional edge I needed.',
      portfolioUrl: '#',
      social: {
        twitter: '#',
        globe: '#'
      },
      tag: 'Creative'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Portfolios Created' },
    { number: '95%', label: 'Customer Satisfaction' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '72hr', label: 'Avg. Time to Hire' }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Loved by Professionals Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who've transformed their careers with stunning portfolio websites
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold animated-gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 transform translate-x-32 -translate-y-32"></div>
              
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-blue-100 opacity-50">
                < FiMessageCircle className="w-20 h-20" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-16 h-16 rounded-full mr-4 ring-4 ring-blue-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                      </p>
                      <span className="inline-block mt-1 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold rounded-full">
                        {testimonials[activeIndex].tag}
                      </span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    {testimonials[activeIndex].social.linkedin && (
                      <a
                        href={testimonials[activeIndex].social.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {testimonials[activeIndex].social.twitter && (
                      <a
                        href={testimonials[activeIndex].social.twitter}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FiTwitter className="w-5 h-5" />
                      </a>
                    )}
                    {testimonials[activeIndex].social.globe && (
                      <a
                        href={testimonials[activeIndex].social.globe}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FiGlobe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <FiChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-gray-600 mb-8 text-lg">
            Ready to join thousands of satisfied professionals?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary"
          >
            Create Your Portfolio Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )}
  export default Testimonials;