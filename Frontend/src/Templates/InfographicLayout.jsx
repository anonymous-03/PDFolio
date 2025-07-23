import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Award, Briefcase, Code, Coffee, GitBranch, Globe, 
  Heart, Layers, Monitor, Package, Star, TrendingUp,
  Users, Zap, Calendar, Clock, Target, CheckCircle
} from 'react-feather';
import ContactForm from '../components/TemplateBlocks/ContactForm';
import FooterBlock from '../components/TemplateBlocks/SocialLinks';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useNavigate } from 'react-router-dom';


const InfographicLayout = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const [loading, setIsLoading] = useState(true);
  const { pid } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const getResumeData = async () => {
      if (!pid) {
        setIsLoading(false);
        setError("No resume ID provided.");
        navigate('/upload');
        return;
      }
      try {
        const response = await api.get(`/api/resume-data/${pid}`);
        if (response.data) {
          setResumeData(response.data);
        }
        else {
          navigate('/upload');
          throw new Error("Resume data not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getResumeData();
  }, [pid, navigate])

  // Destructure resumeData
  const {
    personalInfo = {},
    summary = {},
    skills = { technical: [], tools: [], soft: [] },
    experience = [],
    projects = [],
    education = [],
    certifications = [],
    languages = [],
    footer = { socials: [] }
  } = resumeData || {};

  // Animated counters
  const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        let startTime;
        const animateCount = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };
        requestAnimationFrame(animateCount);
      }
    }, [isInView, end, duration]);

    return (
      <span ref={ref} className="font-bold">
        {count}{suffix}
      </span>
    );
  };

  // Calculate stats
  const stats = {
    yearsExperience: summary?.yearsExperience || 5,
    projectsCompleted: projects?.length || 10,
    technologiesUsed: (skills?.technical?.length || 0) + (skills?.tools?.length || 0) || 15,
    coffeeConsumed: 2847, // Fun stat
    linesOfCode: '50K+',
    githubCommits: 1234
  };

  const colorPalette = {
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-blue-500 to-cyan-500',
    accent: 'from-orange-500 to-red-500',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-yellow-500 to-orange-500'
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error || !resumeData) {
    return <div className="flex justify-center items-center h-screen">Error: {error || "Resume data could not be loaded."}</div>;
  }

  return (
    <div className="infographic-layout min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-30"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-30"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Hero Section with Photo */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated Avatar/Photo Placeholder */}
          <motion.div
            className="relative w-48 h-48 mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <Users size={80} className="text-purple-500" />
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <CheckCircle size={24} className="text-white" />
            </motion.div>
          </motion.div>

          {/* Personal Info with Animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {personalInfo?.name || 'Your Name'}
            </h1>
            <p className="text-2xl text-gray-600 mb-8">{personalInfo?.title || 'Your Title'}</p>
            <p className="text-lg text-gray-500 flex items-center justify-center gap-2">
              <Globe size={20} />
              {personalInfo?.location || 'Your Location'}
            </p>
          </motion.div>

          {/* Animated Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-800">
                <AnimatedCounter end={stats.yearsExperience} suffix="+" />
              </p>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-800">
                <AnimatedCounter end={stats.projectsCompleted} />
              </p>
              <p className="text-sm text-gray-500">Projects Completed</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <Code className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-800">
                {stats.linesOfCode}
              </p>
              <p className="text-sm text-gray-500">Lines of Code</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <Coffee className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-800">
                <AnimatedCounter end={stats.coffeeConsumed} />
              </p>
              <p className="text-sm text-gray-500">Coffee Consumed</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
                {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-8 h-12 border-2 border-purple-500 rounded-full flex justify-center">
            <div className="w-1 h-4 bg-purple-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.section>

      {/* Skills as Interactive Charts */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>

          {/* Skill Bars with Icons */}
          <div className="grid md:grid-cols-2 gap-8">
            {skills?.technical && skills.technical.length > 0 && (
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Zap className="text-yellow-500" />
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {skills.technical.map((skill, index) => (
                    <div key={Date.now() + index} >
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{skill}</span>
                        <span className="text-gray-500 text-sm">
                          {90 - index * 5}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${
                            index % 2 === 0 ? colorPalette.primary : colorPalette.secondary
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${90 - index * 5}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tools as Circular Progress */}
            {skills?.tools && skills.tools.length > 0 && (
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Layers className="text-purple-500" />
                  Tools & Technologies
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {skills.tools.map((tool, index) => (
                    <motion.div
                      key={Date.now() + index}
                      className="text-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                    >
                      <div className="relative w-20 h-20 mx-auto mb-2">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 36}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                            whileInView={{ 
                              strokeDashoffset: 2 * Math.PI * 36 * (1 - (85 - index * 5) / 100)
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                          <defs>
                            <linearGradient id="gradient">
                              <stop offset="0%" stopColor="#a855f7" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Monitor size={24} className="text-purple-500" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{tool}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Career Journey
          </motion.h2>

          {/* Visual Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />

            {/* Experience Items */}
            {experience && experience.length > 0 && experience.map((exp, index) => (
              <motion.div
                key={Date.now() + index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="text-purple-500" size={20} />
                      <h3 className="text-xl font-bold text-gray-800">{exp.title || 'Job Title'}</h3>
                    </div>
                    <p className="text-purple-600 font-medium mb-1">{exp.company || 'Company Name'}</p>
                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.period || 'Date Range'}
                    </p>
                    <p className="text-gray-600">{exp.description || 'Job description'}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-purple-500 rounded-full z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects with Statistics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 && projects.map((project, index) => (
              <motion.div
                key={Date.now() + index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
              >
                {/* Project Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${
                  index % 3 === 0 ? colorPalette.primary : 
                  index % 3 === 1 ? colorPalette.secondary : 
                  colorPalette.accent
                } flex items-center justify-center mb-4`}>
                  <GitBranch className="text-white" size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name || 'Project Name'}</h3>
                <p className="text-gray-600 mb-4">{project.description || 'Project description'}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech && project.tech.map((tech, idx) => (
                    <span
                      key={Date.now() + idx}
                      className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      <AnimatedCounter end={3 + index} />
                    </p>
                    <p className="text-xs text-gray-500">APIs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      <AnimatedCounter end={12 + index * 2} />K
                    </p>
                    <p className="text-xs text-gray-500">Lines</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      <AnimatedCounter end={95 + index} />%
                    </p>
                    <p className="text-xs text-gray-500">Complete</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Animation */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Let's Build Something Amazing</h2>
            <p className="text-xl opacity-90">Ready to bring your ideas to life?</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>

          {/* Fun Statistics */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-12 text-center text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="text-3xl font-bold">24h</p>
              <p className="text-sm opacity-80">Response Time</p>
            </div>
            <div>
              <Target className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm opacity-80">Commitment</p>
            </div>
            <div>
              <Heart className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="text-3xl font-bold">∞</p>
              <p className="text-sm opacity-80">Passion</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Social Stats */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-3xl font-bold text-purple-400">
                <AnimatedCounter end={stats.githubCommits} />
              </p>
              <p className="text-sm text-gray-400">GitHub Commits</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">
                <AnimatedCounter end={500} suffix="+" />
              </p>
              <p className="text-sm text-gray-400">LinkedIn Connections</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-pink-400">
                <AnimatedCounter end={50} suffix="+" />
              </p>
              <p className="text-sm text-gray-400">Articles Written</p>
            </div>
          </motion.div>
          <FooterBlock socials={footer?.socials} />
        </div>
      </footer>

      {/* Floating Progress Indicator */}
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
        style={{ scale }}
      >
        <div className="w-2 h-32 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
            style={{ height: scrollYProgress }}
          />
        </div>
      </motion.div>

      {/* Infographic Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        .infographic-layout {
          font-family: 'Poppins', sans-serif;
        }

        /* Override component styles for Infographic theme */
        .infographic-layout .personal-info-block h1 {
          @apply text-5xl md:text-7xl font-bold;
        }
        
        .infographic-layout .personal-info-block p {
          @apply text-xl text-gray-600;
        }

        .infographic-layout .summary-block {
          @apply text-gray-700 text-lg leading-relaxed;
        }

        .infographic-layout .project-card {
          @apply bg-white rounded-2xl p-6 shadow-xl;
        }

        .infographic-layout .project-card h3 {
          @apply text-xl font-bold text-gray-800 mb-2;
        }

        .infographic-layout .project-card p {
          @apply text-gray-600 mb-4;
        }

        .infographic-layout .tech-tag {
          @apply px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium;
        }

        .infographic-layout .experience-item {
          @apply bg-white rounded-2xl p-6 shadow-xl;
        }

        .infographic-layout .experience-item h3 {
          @apply text-xl font-bold text-gray-800;
        }

        .infographic-layout .experience-meta {
          @apply text-purple-600 font-medium;
        }

        .infographic-layout .experience-description {
          @apply text-gray-600;
        }

        .infographic-layout .skills-block {
          @apply space-y-4;
        }

        .infographic-layout .skill-category h3 {
          @apply text-xl font-bold mb-4 flex items-center gap-2;
        }

        .infographic-layout .contact-form {
          @apply max-w-full;
        }

        .infographic-layout .contact-form label {
          @apply text-gray-700 font-medium text-sm;
        }

        .infographic-layout .contact-form input,
        .infographic-layout .contact-form textarea {
          @apply bg-gray-50 border-gray-200 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500;
        }

        .infographic-layout .contact-form button {
          @apply bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg;
        }

        .infographic-layout .footer-block {
          @apply text-center;
        }

        .infographic-layout .social-link {
          @apply text-gray-400 hover:text-white text-lg;
        }

        /* Custom animations */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(168, 85, 247, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(168, 85, 247, 0);
          }
        }

        .infographic-layout .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .infographic-layout .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }

        /* Gradient text animation */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .infographic-layout .animated-gradient-text {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default InfographicLayout;