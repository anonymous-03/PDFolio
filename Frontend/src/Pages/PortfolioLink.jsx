// src/pages/PortfolioLink.jsx
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  Edit3, 
  ArrowRight,
  Globe,
  Lock,
  Unlock
} from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';


const PortfolioLink = () => {
  const [copied, setCopied] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [template, setTemplate] = useState(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  
  const { currentTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
    // console.log(user);
  useEffect(() => {
    // Get selected template from localStorage
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
      const templateData = JSON.parse(selectedTemplate);
      setTemplate(templateData);
      
      // Generate initial portfolio URL
      const baseUrl = window.location.origin;
      const portfolioPath = `/portfolio/${templateData.id}/${user?._id || 'preview'}`;
      setPortfolioUrl(`${baseUrl}${portfolioPath}`);
    } else {
      navigate('/select-template');
    }
  }, [user, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.name}'s Portfolio`,
          text: 'Check out my professional portfolio!',
          url: portfolioUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };


  return (
    <div className={`min-h-screen pt-20 ${currentTheme.bgClass} transition-all duration-500`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full 
            ${currentTheme.accent} bg-opacity-20 mb-6`}>
            <Check className={`w-10 h-10 ${currentTheme.primary}`} />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${currentTheme.primary}`}>
            Portfolio Created Successfully!
          </h1>
          <p className={`text-lg ${currentTheme.text} opacity-80`}>
            Your portfolio is ready. Share it with the world!
          </p>
        </motion.div>

        {/* Portfolio URL Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${currentTheme.cardBg} rounded-2xl p-8 ${currentTheme.cardShadow} mb-8`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${currentTheme.text}`}>
              Your Portfolio Link
            </h2>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm
              ${isPublished 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`}>
              {isPublished ? (
                <>
                  <Unlock className="w-4 h-4" />
                  Published
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Draft
                </>
              )}
            </div>
          </div>

          {/* URL Display */}
          <div className={`flex items-center gap-4 p-4 rounded-lg ${currentTheme.bgClass} 
            border ${currentTheme.borderColor} mb-6`}>
            <Globe className={`w-5 h-5 ${currentTheme.text} opacity-60`} />
            <input
              type="text"
              value={portfolioUrl}
              readOnly
              className={`flex-1 bg-transparent ${currentTheme.text} outline-none`}
            />
            <button
              onClick={handleCopyLink}
              className={`p-2 rounded-lg ${currentTheme.buttonBg} ${currentTheme.buttonText} 
                hover:opacity-90 transition-all duration-300`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleShare}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 
                px-6 py-3 rounded-lg ${currentTheme.buttonBg} ${currentTheme.buttonText} 
                hover:opacity-90 transition-all duration-300`}
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 
                px-6 py-3 rounded-lg border ${currentTheme.borderColor} ${currentTheme.text} 
                hover:bg-opacity-10 hover:${currentTheme.accent} transition-all duration-300`}
            >
              <ExternalLink className="w-5 h-5" />
              Preview
            </a>
            <a
              href='/dashboard'
              // target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 
                px-6 py-3 rounded-lg border ${currentTheme.borderColor} ${currentTheme.text} 
                hover:bg-opacity-10 hover:${currentTheme.accent} transition-all duration-300`}
            >
              Go to DashBoard
            </a>
            
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default PortfolioLink;