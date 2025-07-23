import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, X, ArrowRight, ExternalLink, GitHub, Linkedin, Twitter } from 'react-feather';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExperienceItem from '../components/TemplateBlocks/Experience';
import PersonalInfoBlock from '../components/TemplateBlocks/PersonalInfo';
import ProjectCard from '../components/TemplateBlocks/Projects';
import SkillsBlock from '../components/TemplateBlocks/Skills';
import FooterBlock from '../components/TemplateBlocks/SocialLinks';
import SummaryBlock from '../components/TemplateBlocks/Summary';
import ContactForm from '../components/TemplateBlocks/ContactForm';

const GalleryLayout = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [resumeData, setResumeData] = useState({});
  const [loading, setIsLoading] = useState(true);
  const { pid } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResumeData = async () => {
      if (!pid) {
        setIsLoading(false);
        setError("No resume ID provided.");
        navigate('/upload');
        return;
      }
      try {
        const response = await axios.get(`/api/resume-data/${pid}`);
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

  // Generate placeholder images if not provided
  const projectsWithImages = resumeData.projects?.map((project, index) => ({
    ...project,
    image: project.image || `https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg`
  })) || [];

  // Masonry layout calculation
  const calculateMasonryLayout = () => {
    const columns = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    return columns;
  };

  const [columns, setColumns] = useState(calculateMasonryLayout());

  useEffect(() => {
    const handleResize = () => {
      setColumns(calculateMasonryLayout());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error || !resumeData) {
    return <div className="flex justify-center items-center h-screen">Error: {error || "Resume data could not be loaded."}</div>;
  }

  return (
    <div className="gallery-layout min-h-screen bg-white dark:bg-gray-900">
      {/* Minimal Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-100 dark:border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Personal Info - Minimal */}
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-light text-gray-900 dark:text-white">
                {resumeData.personalInfo?.name}
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
                {resumeData.personalInfo?.title}
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <a href="#gallery" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Work
              </a>
              <a href="#about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Contact
              </a>

              {/* View Toggle */}
              <div className="flex items-center gap-2 ml-6 border-l border-gray-200 dark:border-gray-700 pl-6">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 ${viewMode === 'grid' ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 ${viewMode === 'list' ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Gallery Section */}
      <main className="pt-20">
        <section id="gallery" className="min-h-screen py-12">
          <motion.div
            className="max-w-7xl mx-auto px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Gallery Grid/List */}
            {viewMode === 'grid' ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                {projectsWithImages.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ y: -8 }}
                  >
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3]">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay on Hover */}
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            className="absolute inset-0 bg-black/70 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-center text-white p-6">
                              <h3 className="text-2xl font-light mb-2">{project.name}</h3>
                              <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                                {project.description}
                              </p>
                              <motion.div
                                className="flex items-center justify-center gap-2 text-sm"
                                whileHover={{ x: 5 }}
                              >
                                View Project <ArrowRight size={16} />
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Minimal Project Info */}
                    <div className="mt-4">
                      <h3 className="text-lg font-light text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tech?.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-xs text-gray-500 dark:text-gray-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-8">
                {projectsWithImages.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex gap-8 items-center">
                      <div className="w-1/3 aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tech?.map((tech, idx) => (
                              <span key={idx} className="text-sm text-gray-500 dark:text-gray-400">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <ExternalLink size={18} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors ml-auto" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              className="grid md:grid-cols-2 gap-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Experience */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-8">
                  Experience
                </h2>
                <div className="space-y-6">
                  {resumeData.experience?.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ExperienceItem experience={exp} index={index} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* About & Skills */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-8">
                  About
                </h2>
                {resumeData.summary && (
                  <div className="mb-12">
                    <SummaryBlock summary={resumeData.summary} />
                  </div>
                )}
                {resumeData.skills && (
                  <div>
                    <h3 className="text-lg font-light text-gray-900 dark:text-white mb-4">
                      Skills
                    </h3>
                    <SkillsBlock skills={resumeData.skills} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
                Let's Work Together
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-12">
                Have a project in mind? Get in touch.
              </p>
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} {resumeData.personalInfo?.name}
            </p>
            <FooterBlock socials={resumeData.footer?.socials} />
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="min-h-screen flex items-center justify-center p-6"
              initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-gray-900 max-w-4xl w-full rounded-lg overflow-hidden">
                {/* Modal Header */}
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-96 object-cover"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full backdrop-blur-sm"
                  >
                    <X size={20} className="text-gray-900 dark:text-white" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
                    {selectedProject.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tech?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {selectedProject.link && (
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                      >
                        View Live <ExternalLink size={16} />
                      </a>
                    )}
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        View Code <GitHub size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        
        .gallery-layout {
          font-family: 'Inter', sans-serif;
        }

        /* Override component styles for Gallery theme */
        .gallery-layout .personal-info-block h1 {
          @apply text-xl font-light;
        }
        
        .gallery-layout .personal-info-block p {
          @apply text-sm text-gray-500 dark:text-gray-400;
        }

        .gallery-layout .project-card {
          @apply bg-transparent p-0;
        }

        .gallery-layout .experience-item {
          @apply border-l-0 pl-0;
        }

        .gallery-layout .experience-item h3 {
          @apply text-base font-medium text-gray-900 dark:text-white;
        }

        .gallery-layout .experience-meta {
          @apply text-sm text-gray-500 dark:text-gray-400;
        }

        .gallery-layout .experience-description {
          @apply text-sm text-gray-600 dark:text-gray-300;
        }

        .gallery-layout .summary-block {
          @apply text-gray-600 dark:text-gray-300;
        }

        .gallery-layout .skills-block {
          @apply text-sm;
        }

        .gallery-layout .skill-category h3 {
          @apply text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
        }

        .gallery-layout .skill-category span {
          @apply bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 text-xs;
        }

        .gallery-layout .contact-form {
          @apply text-left;
        }

        .gallery-layout .contact-form label {
          @apply text-sm text-gray-700 dark:text-gray-300;
        }

        .gallery-layout .contact-form input,
        .gallery-layout .contact-form textarea {
          @apply bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white;
        }

        .gallery-layout .contact-form button {
          @apply bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100;
        }

        .gallery-layout .footer-block {
          @apply py-0;
        }

        .gallery-layout .social-link {
          @apply text-gray-500 hover:text-gray-900 dark:hover:text-white;
        }

        /* Custom scrollbar for gallery */
        .gallery-layout::-webkit-scrollbar {
          width: 8px;
        }

        .gallery-layout::-webkit-scrollbar-track {
          background: transparent;
        }

        .gallery-layout::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 4px;
        }

        .gallery-layout.dark::-webkit-scrollbar-thumb {
          background: #374151;
        }

        /* Image loading animation */
        @keyframes imageFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .gallery-layout img {
          animation: imageFadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GalleryLayout;