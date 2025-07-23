import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ExperienceItem from '../components/TemplateBlocks/Experience';
import ProjectCard from '../components/TemplateBlocks/Projects';
import SkillsBlock from '../components/TemplateBlocks/Skills';
import FooterBlock from '../components/TemplateBlocks/SocialLinks';
import SummaryBlock from '../components/TemplateBlocks/Summary';
import ContactForm from '../components/TemplateBlocks/ContactForm';

const NovaLayoutContent = ({ resumeData }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef, 
  });

  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Destructure resumeData safely
  const { 
    personalInfo, landing, summary, skills, projects, experience, footer 
  } = resumeData;

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const ScrollIndicator = ({ text = "Scroll" }) => (
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <span className="text-sm uppercase tracking-widest">{text}</span>
      <ChevronDown size={24} />
    </motion.div>
  );

  return (
    <div 
      ref={containerRef}
      className="nova-layout h-screen overflow-y-auto overflow-x-hidden bg-black text-white"
    >
      {/* Panel 1: Hero/Landing with Personal Info */}
      <motion.section 
        className="nova-section relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-teal-900"

        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated background elements... */}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-2xl md:text-3xl text-purple-200 mb-4">
              {personalInfo.title}
            </p>
            <div className="flex items-center justify-center gap-2">
              <MapPin size={20} className="text-teal-300" />
              <p className="text-lg text-gray-200">
                {personalInfo.location}
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              {landing.headline}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {landing.subheadline}
            </p>
          </motion.div>
        </div>
        <ScrollIndicator />
      </motion.section>

      {/* Panel 2: Experience & Summary */}
      <motion.section 
        className="nova-section relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
        variants={sectionVariants}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }}
      >
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto mb-16">
            <SummaryBlock summary={summary} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience Timeline
            </span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {experience?.map((exp, index) => (
              <motion.div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <ExperienceItem experience={exp} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
        <ScrollIndicator text="Projects" />
      </motion.section>

      {/* Panel 3: Projects & Skills */}
      <motion.section 
        className="nova-section relative min-h-screen flex items-center bg-gradient-to-br from-teal-900 via-gray-900 to-purple-900"
        variants={sectionVariants}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }}
      >
        <div className="container mx-auto px-6 py-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Featured Projects
                </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                {projects?.map((project, index) => (
                    <motion.div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
                        <ProjectCard project={project} index={index} />
                    </motion.div>
                ))}
            </div>
            <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-8 text-center text-white/90">
                    Skills & Technologies
                </h3>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                    <SkillsBlock skills={skills} />
                </div>
            </div>
        </div>
        <ScrollIndicator text="Contact" />
      </motion.section>

      {/* Panel 4: Contact & Footer */}
      <motion.section 
        className="nova-section relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-900 via-black to-purple-900"
        variants={sectionVariants}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }}
      >
          <div className="relative z-10 container mx-auto px-6 py-20">
              <div className="max-w-2xl mx-auto mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
                      Let's Connect
                    </span>
                  </h2>
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                    <ContactForm />
                  </div>
              </div>
              <div className="border-t border-white/10 pt-8">
                  <FooterBlock socials={footer?.socials} />
              </div>
          </div>
      </motion.section>
    </div>
  );
};


const NovaLayout = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { pid } = useParams();
  const navigate = useNavigate();

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
        } else {
          throw new Error("Resume data not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    getResumeData();
  }, [pid, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-xl">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-xl text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

  return <NovaLayoutContent resumeData={resumeData} />;
};

export default NovaLayout;