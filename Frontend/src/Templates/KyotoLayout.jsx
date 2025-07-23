import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Circle, ArrowRight, Feather } from 'react-feather';
import ContactForm from '../components/TemplateBlocks/ContactForm';
import ExperienceItem from '../components/TemplateBlocks/Experience';
import PersonalInfoBlock from '../components/TemplateBlocks/PersonalInfo';
import ProjectCard from '../components/TemplateBlocks/Projects';
import SkillsBlock from '../components/TemplateBlocks/Skills';
import FooterBlock from '../components/TemplateBlocks/SocialLinks';
import SummaryBlock from '../components/TemplateBlocks/Summary';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KyotoLayout = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Destructure resumeData with defaults
  const { 
    personalInfo = {
      name: 'Your Name',
      title: 'Your Title',
      location: 'Your Location',
      email: 'your.email@example.com',
      phone: '+1 (555) 000-0000'
    }, 
    landing = {
      headline: 'Welcome',
      subheadline: 'Passionate full-stack developer creating meaningful digital experiences'
    }, 
    summary = {
      text: 'Your professional summary goes here...'
    },
    skills = {
      technical: [],
      tools: [],
      soft: []
    },
    projects = [], 
    experience = [], 
    contact = {}, 
    footer = {
      socials: []
    } 
  } = resumeData || {};

  // Sections for navigation with Japanese characters
  const sections = [
    { id: 'welcome', label: '始', title: 'Welcome' },
    { id: 'about', label: '私', title: 'About' },
    { id: 'experience', label: '経', title: 'Experience' },
    { id: 'projects', label: '作', title: 'Projects' },
    { id: 'skills', label: '技', title: 'Skills' },
    { id: 'contact', label: '連', title: 'Contact' }
  ];

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = document.querySelectorAll('.kyoto-section');
      
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Custom styles for the Kyoto theme
  const kyotoStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&family=Inter:wght@300;400;500&display=swap');
    
    .kyoto-layout {
      font-family: 'Inter', sans-serif;
    }
    
    .kyoto-layout h1,
    .kyoto-layout h2,
    .kyoto-layout h3 {
      font-family: 'Crimson Text', serif;
    }

    /* Custom sage color palette */
    .bg-sage-50 { background-color: #f3f4f0; }
    .bg-sage-100 { background-color: #e5e7db; }
    .bg-sage-200 { background-color: #cbd0b7; }
    .bg-sage-300 { background-color: #a8b293; }
    .bg-sage-400 { background-color: #87946f; }
    .bg-sage-500 { background-color: #6b7755; }
    .bg-sage-600 { background-color: #4f5a3e; }
    .bg-sage-700 { background-color: #3a422e; }
    .text-sage-100 { color: #e5e7db; }
    .text-sage-300 { color: #a8b293; }
    .text-sage-400 { color: #87946f; }
    .text-sage-500 { color: #6b7755; }
    .text-sage-600 { color: #4f5a3e; }
    .text-sage-700 { color: #3a422e; }
    .border-sage-200 { border-color: #cbd0b7; }
    .border-sage-300 { border-color: #a8b293; }
    .border-sage-400 { border-color: #87946f; }
    .hover\\:border-sage-400:hover { border-color: #87946f; }
    .hover\\:text-sage-600:hover { color: #4f5a3e; }
    .hover\\:text-sage-700:hover { color: #3a422e; }
    .hover\\:bg-sage-700:hover { background-color: #3a422e; }
    .focus\\:ring-sage-500:focus { --tw-ring-color: #6b7755; }
    .focus\\:border-sage-500:focus { border-color: #6b7755; }

    /* Override component styles for Kyoto theme */
    .kyoto-layout .personal-info-block h1 {
      color: #1c1917;
      font-size: 1.875rem;
      font-weight: 300;
      margin-bottom: 0.5rem;
    }
    
    .kyoto-layout .personal-info-block p:first-of-type {
      color: #78716c;
      font-size: 0.875rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }
    
    .kyoto-layout .personal-info-block p:last-of-type {
      color: #a8a29e;
      font-size: 0.875rem;
    }

    .kyoto-layout .project-card {
      background-color: #fafaf9;
      padding: 2rem;
      border-radius: 0.5rem;
      border: 1px solid #e7e5e4;
      transition: all 0.3s ease;
    }

    .kyoto-layout .project-card:hover {
      border-color: #87946f;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .kyoto-layout .project-card h3 {
      color: #1c1917;
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
      transition: colors 0.3s ease;
    }

    .kyoto-layout .project-card:hover h3 {
      color: #3a422e;
    }

    .kyoto-layout .project-card p {
      color: #78716c;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .kyoto-layout .tech-tag {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: #e5e7db;
      color: #3a422e;
      border-radius: 9999px;
      font-size: 0.875rem;
      margin: 0.25rem 0.25rem 0.25rem 0;
    }

    .kyoto-layout .experience-item {
      position: relative;
      padding-left: 2rem;
      padding-bottom: 2rem;
      border-left: 2px solid #cbd0b7;
    }

    .kyoto-layout .experience-item:last-child {
      border-left: none;
    }

    .kyoto-layout .experience-item::before {
      content: '';
      position: absolute;
      left: -9px;
      top: 0;
      width: 16px;
      height: 16px;
      background-color: #87946f;
      border-radius: 50%;
      border: 2px solid #fafaf9;
    }

    .kyoto-layout .experience-item h3 {
      color: #1c1917;
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .kyoto-layout .experience-company {
      color: #78716c;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .kyoto-layout .experience-period {
      color: #a8a29e;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }

    .kyoto-layout .experience-description {
      color: #78716c;
      line-height: 1.6;
    }

    .kyoto-layout .contact-form {
      max-width: 100%;
    }

    .kyoto-layout .contact-form label {
      color: #44403c;
      font-weight: 500;
      display: block;
      margin-bottom: 0.5rem;
    }

    .kyoto-layout .contact-form input,
    .kyoto-layout .contact-form textarea {
      width: 100%;
      background-color: white;
      border: 1px solid #d6d3d1;
      color: #1c1917;
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
    }

    .kyoto-layout .contact-form input:focus,
    .kyoto-layout .contact-form textarea:focus {
      outline: none;
      border-color: #6b7755;
      ring: 2px solid #6b7755;
    }

    .kyoto-layout .contact-form button {
      background-color: #4f5a3e;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .kyoto-layout .contact-form button:hover {
      background-color: #3a422e;
    }

    .kyoto-layout .footer-block {
      color: #78716c;
      text-align: center;
    }

    .kyoto-layout .social-link {
      color: #78716c;
      transition: color 0.3s ease;
      text-decoration: none;
      margin: 0 0.5rem;
    }

    .kyoto-layout .social-link:hover {
      color: #4f5a3e;
    }
  `;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (error || !resumeData) {
    return <div className="flex justify-center items-center h-screen">Error: {error || "Resume data could not be loaded."}</div>;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: kyotoStyles }} />
      <div className="kyoto-layout min-h-screen bg-stone-50 text-stone-900">
        {/* Fixed Sidebar - Desktop */}
        <motion.aside 
          className="hidden lg:block fixed left-0 top-0 h-full w-80 bg-stone-100 border-r border-stone-300 z-40"
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="h-full flex flex-col p-8">
            {/* Personal Info */}
            <div className="mb-12">
              <motion.div
                                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <PersonalInfoBlock data={personalInfo} />
              </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-6">
                {sections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`group flex items-center gap-4 text-left transition-all duration-300 ${
                        activeSection === section.id 
                          ? 'text-stone-900' 
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      <span className={`text-3xl font-light transition-colors ${
                        activeSection === section.id ? 'text-sage-600' : 'text-stone-400'
                      }`}>{section.label}</span>
                      <span className="text-sm tracking-wider">{section.title}</span>
                      <motion.div
                        className="ml-auto"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: activeSection === section.id ? 1 : 0,
                          x: activeSection === section.id ? 0 : -10
                        }}
                      >
                        <Circle size={8} className="fill-sage-500 text-sage-500" />
                      </motion.div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Decorative Element */}
            <div className="mt-auto">
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mb-6"
              >
                <Feather size={24} className="text-sage-400" />
              </motion.div>
              <motion.div 
                className="w-24 h-0.5 bg-sage-500"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.8, duration: 1 }}
              />
              <p className="mt-4 text-xs text-stone-500 font-light">
                © {new Date().getFullYear()} • 京都
              </p>
            </div>
          </div>
        </motion.aside>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-stone-100 border-b border-stone-300 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="text-stone-800">
              <h2 className="text-xl font-light">{personalInfo?.name || 'Your Name'}</h2>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 bg-stone-100 z-40 pt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <nav className="p-8">
                <ul className="space-y-6">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className="flex items-center gap-4 text-left w-full text-stone-700 hover:text-sage-600"
                      >
                        <span className="text-3xl text-sage-500">{section.label}</span>
                        <span className="text-sm tracking-wider">{section.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="lg:ml-80 pt-16 lg:pt-0">
          {/* Welcome Section */}
          <section id="welcome" className="kyoto-section min-h-screen flex items-center justify-center px-8 lg:px-16 bg-gradient-to-b from-stone-50 to-sage-50">
            <motion.div
              className="max-w-2xl text-center lg:text-left"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="mb-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Circle size={40} className="text-sage-300 mx-auto lg:mx-0" />
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-light leading-tight mb-8 text-stone-900">
                {landing?.headline || 'Welcome'}
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-12">
                {landing?.subheadline || 'Passionate full-stack developer creating meaningful digital experiences'}
              </p>
              <motion.div 
                className="flex items-center gap-2 text-sage-600 justify-center lg:justify-start"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-sm">Scroll to explore</span>
                <ArrowRight size={16} />
              </motion.div>
            </motion.div>
          </section>

          {/* About/Summary Section */}
          {summary && (
            <section id="about" className="kyoto-section py-24 px-8 lg:px-16 bg-stone-50">
              <motion.div
                className="max-w-3xl mx-auto"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl font-light mb-12 flex items-center gap-4 text-stone-900">
                  <span className="text-5xl text-sage-400">私</span>
                  About
                </h2>
                <div className="bg-white p-8 rounded-lg border border-stone-200 shadow-sm">
                  <SummaryBlock summary={summary} />
                </div>
              </motion.div>
            </section>
          )}

          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <section id="experience" className="kyoto-section py-24 px-8 lg:px-16 bg-gradient-to-b from-sage-50 to-stone-50">
              <motion.div
                className="max-w-3xl mx-auto"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl font-light mb-12 flex items-center gap-4 text-stone-900">
                  <span className="text-5xl text-sage-400">経</span>
                  Experience
                </h2>
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <ExperienceItem experience={exp} index={index} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <section id="projects" className="kyoto-section py-24 px-8 lg:px-16 bg-stone-50">
              <motion.div
                className="max-w-5xl mx-auto"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl font-light mb-12 flex items-center gap-4 text-stone-900">
                  <span className="text-5xl text-sage-400">作</span>
                  Projects
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <ProjectCard project={project} index={index} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {/* Skills Section */}
          {skills && (
            <section id="skills" className="kyoto-section py-24 px-8 lg:px-16 bg-gradient-to-b from-stone-50 to-sage-50">
              <motion.div
                className="max-w-3xl mx-auto"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl font-light mb-12 flex items-center gap-4 text-stone-900">
                  <span className="text-5xl text-sage-400">技</span>
                  Skills
                </h2>
                <div className="bg-white p-8 rounded-lg border border-stone-200 shadow-sm">
                  <SkillsBlock skills={skills} />
                </div>
              </motion.div>
            </section>
          )}

          {/* Contact Section */}
          <section id="contact" className="kyoto-section py-24 px-8 lg:px-16 bg-stone-50">
            <motion.div
              className="max-w-3xl mx-auto"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-light mb-12 flex items-center gap-4 text-stone-900">
                <span className="text-5xl text-sage-400">連</span>
                Contact
              </h2>
              <div className="bg-gradient-to-br from-sage-50 to-stone-50 p-12 rounded-lg border border-stone-200 shadow-sm">
                <ContactForm />
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-8 lg:px-16 border-t border-stone-200 bg-sage-50">
            <FooterBlock socials={footer?.socials} />
          </footer>
        </main>

        {/* Decorative Elements */}
        <div className="fixed bottom-8 right-8 hidden lg:block">
          <motion.div
            className="relative"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 border-2 border-sage-300 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-sage-500 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default KyotoLayout;