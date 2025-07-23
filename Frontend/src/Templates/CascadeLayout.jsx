import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceItem from '../components/TemplateBlocks/Experience';
import PersonalInfoBlock from '../components/TemplateBlocks/PersonalInfo';
import ProjectCard from '../components/TemplateBlocks/Projects';
import SkillsBlock from '../components/TemplateBlocks/Skills';
import FooterBlock from '../components/TemplateBlocks/SocialLinks';
import SummaryBlock from '../components/TemplateBlocks/Summary';
import ContactForm from '../components/TemplateBlocks/ContactForm';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
const CascadeLayout = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = React.useState({});
  const [loading,setIsLoading]=useState(true);
  const { pid } = useParams();
  const [error,setError]=useState(null);
  

  useEffect(() => {
    const getResumeData = async () => {
      if (!pid) {
        setIsLoading(false);
        setError("No resume ID provided.");
        navigate('/upload');
        return;
      }
      try {
        const resumeData = await api.get(`/api/resume-data/${pid}`);
        if (resumeData) {

          setResumeData(resumeData.data);

        }
        else {
          navigate('/upload');
          throw new Error("Resume data not found");
        }
      } catch (err) {
        throw new Error(err);
      }finally{
        setIsLoading(false);
      }

    }
    getResumeData();
  },[pid,navigate])



  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error || !resumeData) {
    return <div className="flex justify-center items-center h-screen">Error: {error || "Resume data could not be loaded."}</div>;
  }

  return (

    <motion.div
      className="cascade-layout min-h-screen bg-gray-50 dark:bg-gray-900"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Hero Section with Personal Info */}
      <motion.section
        className="relative w-full h-screen bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white overflow-hidden"
        variants={sectionVariants}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <PersonalInfoBlock data={resumeData.personalInfo} />
            </motion.div>

            <motion.div
              className="mt-8 max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {resumeData.landing.headline}
              </h2>
              <p className="text-xl md:text-2xl text-blue-100">
                {resumeData.landing.subheadline}
              </p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="fixed bottom-5 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Summary Section */}
      {resumeData.summary && (
        <motion.section
          className="py-16 bg-white dark:bg-gray-800"
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SummaryBlock summary={resumeData.summary} />
          </div>
        </motion.section>
      )}

      {/* Main Content Grid */}
      <motion.section
        className="py-16"
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <span className="w-8 h-1 bg-blue-600 mr-3"></span>
                Experience
              </h2>
              <div className="space-y-6">
                {resumeData.experience?.map((exp, index) => (
                  <ExperienceItem
                    key={index}
                    experience={exp}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Column - Projects */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <span className="w-8 h-1 bg-blue-600 mr-3"></span>
                Projects
              </h2>
              <div className="space-y-6">
                {resumeData.projects?.map((project, index) => (
                  <ProjectCard
                    key={index}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      {resumeData.skills && (
        <motion.section
          className="py-16 bg-gray-100 dark:bg-gray-800"
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Skills & Expertise
            </h2>
            <div className="max-w-4xl mx-auto">
              <SkillsBlock skills={resumeData.skills} />
            </div>
          </div>
        </motion.section>
      )}

      {/* Contact Section */}
      <motion.section
        className="py-16 bg-white dark:bg-gray-900"
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              I'm always open to discussing new opportunities
            </p>
          </div>
          <ContactForm />
        </div>
      </motion.section>

      {/* Footer */}
      <motion.section
        className="bg-gray-900 dark:bg-black text-white"
        variants={sectionVariants}
      >
        <FooterBlock socials={resumeData.footer.socials} />
      </motion.section>
    </motion.div>
  );
};

export default CascadeLayout;