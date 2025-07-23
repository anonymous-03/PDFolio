// src/components/HowItWorks.jsx
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiUploadCloud, FiCpu, FiEdit3, FiGlobe, 
  FiCheck, FiArrowRight, FiPlay 
} from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineLightningBolt } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate=useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const {user}=useAuth();
  const steps = [
    {
      number: '01',
      title: 'Upload Your Resume',
      description: 'Simply drag and drop your PDF resume or browse to upload. We support all standard resume formats and sizes up to 10MB.',
      icon: <FiUploadCloud className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      image: '/images/upload-demo.png',
      features: ['PDF format support', 'Drag & drop interface', 'Instant processing'],
      duration: '10 seconds'
    },
    {
      number: '02',
      title: 'AI Enhancement Magic',
      description: 'Our advanced AI analyzes your resume, extracts key information, and enhances it with optimized keywords and formatting for maximum impact.',
      icon: <HiOutlineSparkles className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      image: '/images/ai-demo.png',
      features: ['Smart content extraction', 'Keyword optimization', 'ATS compatibility check'],
      duration: '30 seconds'
    },
    {
      number: '03',
      title: 'Choose Your Template',
      description: 'Choose from Unique professional templates. Just Select your design and you are good to go',
      icon: <FiEdit3 className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500',
      image: '/images/customize-demo.png',
      features: ['50+ templates', 'Drag & drop editor', 'Real-time preview'],
      duration: '15 seconds'
    },
    {
      number: '04',
      title: 'Publish & Share',
      description: 'Your portfolio goes live instantly with a custom URL. Connect your domain, track analytics, and share with recruiters worldwide.',
      icon: <FiGlobe className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      image: '/images/publish-demo.png',
      features: ['Instant publishing', 'Custom domain', 'Analytics dashboard'],
      duration: '5 seconds'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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
    <section id="process" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-green-100 to-teal-100 rounded-full filter blur-3xl opacity-30"
        />
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
            <HiOutlineLightningBolt className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            From Resume to Portfolio in{' '}
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process takes you from upload to live portfolio in under 2 minutes. 
            No technical skills required.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={stepVariants}
                className={`
                  relative cursor-pointer transition-all duration-300
                  ${activeStep === index ? 'scale-105' : 'scale-100 opacity-70 hover:opacity-100'}
                `}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex gap-6">
                  {/* Step Number & Icon */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`
                        w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} 
                        flex items-center justify-center text-white shadow-lg
                        ${activeStep === index ? 'scale-110' : ''}
                      `}
                    >
                      {step.icon}
                    </motion.div>
                    
                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                        className="absolute top-16 left-8 w-0.5 h-full bg-gradient-to-b from-gray-300 to-transparent"
                      />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`
                        text-sm font-bold px-3 py-1 rounded-full
                        ${activeStep === index 
                          ? 'bg-gradient-to-r ' + step.color + ' text-white' 
                          : 'bg-gray-100 text-gray-600'
                        }
                      `}>
                        STEP {step.number}
                      </span>
                      <span className="text-sm text-gray-500">~{step.duration}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Features */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeStep === index ? 1 : 0 }}
                      className="flex flex-wrap gap-3"
                    >
                      {step.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="text-sm text-gray-500 flex items-center gap-1"
                        >
                          <FiCheck className="text-green-500" />
                          {feature}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl">
              {/* Demo Screen */}
              <div className="bg-white rounded-2xl shadow-inner p-6 mb-6">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl relative overflow-hidden">
                  {/* Animated Demo Content */}
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center text-white`}>
                      {steps[activeStep].icon}
                    </div>
                  </motion.div>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className={`
                    p-3 rounded-xl transition-all duration-300
                    ${activeStep === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                    }
                  `}
                >
                  <FiArrowRight className="w-5 h-5 rotate-180" />
                </button>

                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${activeStep === index 
                          ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gray-300 hover:bg-gray-400'
                        }
                      `}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className={`
                    p-3 rounded-xl transition-all duration-300
                    ${activeStep === steps.length - 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                    }
                  `}
                >
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-3"
            >
              <div className="flex items-center gap-2">
                <FiPlay className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Watch Demo</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              // src/components/HowItWorks.jsx (continued)
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl shadow-lg p-4"
            >
              <div className="flex items-center gap-2">
                <HiOutlineLightningBolt className="w-5 h-5" />
                <span className="text-sm font-bold">2 min average</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Resume?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users (abhi hai nahi pr aa jaayenge) who've already created stunning portfolios. 
            Start your free trial today, sab free hi hai.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="button-primary group" onClick={handleClick}>
              Start Building Now
              <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <FiCheck className="text-green-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FiCheck className="text-green-500" />
              <span>Free Forever Plan</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FiCheck className="text-green-500" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </motion.div>

        {/* Video Demo Modal (Optional) */}
      </div>
    </section>
  );
};

// Video Modal Component
const VideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group"
      >
        <FiPlay className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-2xl p-2 max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <FiX className="w-6 h-6" />
              </button>
              <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
                <FiPlay className="w-20 h-20 text-white/50" />
                {/* Replace with actual video player */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default HowItWorks;