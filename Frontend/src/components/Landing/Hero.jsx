// src/components/Hero.jsx
import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiUpload, FiZap, FiCheck, FiArrowRight, FiPlay, FiFile, FiX } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { useContext } from 'react';
import ToastContextProvider,{ToastContext} from '../../context/ToastContextProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const Hero = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const {user}=useAuth();
  

  const handleClick=()=>{
    navigate('/upload');
  }
  const handleClick2=()=>{
      if(!user){
        navigate('/login');
      }else{
        navigate('/dashboard');
      }
  }
  const features = [
    "AI-Powered Content Enhancement",
    "Professional Templates",
    "Personalised Dashboard",
    "SEO Optimized"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements - Same as before */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/20 rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Same as before */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6"
            >
              <HiSparkles className="text-blue-600 w-4 h-4" />
              <span className="text-sm font-medium text-blue-700">AI-Powered Portfolio Builder</span>
              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">NEW</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Turn Your Resume Into a{' '}
              <span className="relative">
                <span className="gradient-text">Stunning</span>
              </span>{' '}
              Portfolio
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
            >
              Upload your PDF resume and let AI create a beautiful, job-winning portfolio website in seconds. 
              No coding required.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button className="button-primary group" onClick={handleClick2}>
                Get Started Free
                <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Working Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Upload Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div
                onClick={handleClick}
                className={`
                  relative bg-white rounded-3xl shadow-2xl p-8 border-2 border-dashed
                  ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                  ${uploadedFile ? 'border-green-500' : ''}
                  transition-all duration-300 cursor-pointer hover:border-blue-400
                `}
              >
                {!uploadedFile ? (
                  <div className="text-center py-12">
                    <motion.div
                      animate={{
                        y: isDragging ? -10 : 0,
                        scale: isDragging ? 1.1 : 1
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6"
                    >
                      <FiUpload className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-2">
                      Click Here to upload your Resume;
                    </h3>
                    <p className="text-gray-600 mb-4">or click to browse</p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiZap className="w-4 h-4 text-yellow-500" />
                        Instant processing
                      </span>
                      <span>•</span>
                      <span>PDF up to 10MB</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FiFile className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <FiX className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Uploading...</span>
                          <span className="text-gray-600">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    {!isUploading && uploadProgress === 100 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-600"
                      >
                        <FiCheck className="w-5 h-5" />
                        <span className="font-medium">Upload complete! Processing your resume...</span>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Hidden File Input */}
                {/* <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,application/pdf"
                  onChange={handleFileInputChange}
                /> */}
              </div>

              {/* Floating Elements - Same as before */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
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
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Ready</span>
                </div>
                {/* // src/components/Hero.jsx (continued) */}
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs opacity-90">Success Rate</p>
                    <p className="text-lg font-bold">98.5%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Sample Portfolio Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
            >
              <div className="relative w-full h-full">
                {/* Preview Cards */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute top-0 right-0 w-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 transform rotate-6"
                >
                  <div className="w-full h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    x: [0, -10, 0]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute bottom-0 left-0 w-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 transform -rotate-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: '30sec', label: 'Average Build Time' },
            { value: '6+', label: 'Templates' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="group"
            >
              <h3 className="text-3xl md:text-4xl font-bold gradient-text group-hover:scale-110 transition-transform">
                {stat.value}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="bg-white rounded-full shadow-lg px-8 py-4 flex items-center gap-8">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i + 1}`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className="border-l pl-8">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Trusted by <span className="font-semibold">My</span> Ex pertise
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer hover:border-gray-600"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [2, 8, 2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;