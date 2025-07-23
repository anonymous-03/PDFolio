import React, { useState, useEffect, useRef } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

// Simple icon components
const TerminalIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4,17 10,11 4,5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const Loader = ({ size = 16, className = "" }) => (
  <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 11-6.219-8.56"></path>
  </svg>
);

const GitBranch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="6" y1="3" x2="6" y2="15"></line>
    <circle cx="18" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <path d="m18 9a9 9 0 01-9 9"></path>
  </svg>
);

const Code = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6"></polyline>
    <polyline points="8,6 2,12 8,18"></polyline>
  </svg>
);

const User = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Mail = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const Send = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
  </svg>
);

// Mock components for demonstration
const ContactForm = () => (
  <div className="contact-form bg-gray-800 p-4 border border-gray-700">
    <div className="space-y-3">
      <div>
        <label className="text-green-400 text-sm font-normal flex items-center gap-2 mb-1">
          <User size={14} />
          Name:
        </label>
        <input 
          type="text" 
          className="w-full bg-black border border-gray-700 text-white text-sm font-mono focus:border-green-400 focus:ring-1 focus:ring-green-400 px-2 py-1"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="text-green-400 text-sm font-normal flex items-center gap-2 mb-1">
          <Mail size={14} />
          Email:
        </label>
        <input 
          type="email" 
          className="w-full bg-black border border-gray-700 text-white text-sm font-mono focus:border-green-400 focus:ring-1 focus:ring-green-400 px-2 py-1"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="text-green-400 text-sm font-normal mb-1 block">
          Message:
        </label>
        <textarea 
          className="w-full bg-black border border-gray-700 text-white text-sm font-mono focus:border-green-400 focus:ring-1 focus:ring-green-400 px-2 py-1 h-20 resize-none"
          placeholder="Type your message..."
        />
      </div>
      <button className="bg-green-400 text-black hover:bg-green-300 px-4 py-2 font-normal transition-colors flex items-center gap-2">
        <Send size={14} />
        Send Message
      </button>
    </div>
  </div>
);

const SummaryBlock = ({ summary }) => (
  <div className="summary-block text-gray-300 text-sm leading-relaxed">
    <p>{summary || "Passionate software developer with expertise in modern web technologies. Focused on creating efficient, scalable solutions and continuous learning."}</p>
  </div>
);

const SkillsBlock = ({ skills = [] }) => {
  // Ensure skills is always an array with default values
  const skillsData = Array.isArray(skills) && skills.length > 0 
    ? skills 
    : [
        { category: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'CSS'] },
        { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB'] }
      ];

  return (
    <div className="skills-block text-gray-300">
      {skillsData.map((category, idx) => (
        <div key={idx} className="skill-category mb-3">
          <h3 className="text-yellow-400 text-sm font-normal mb-2">{category?.category || 'Skills'}:</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(category?.items) ? category.items : []).map((skill, skillIdx) => (
              <span key={skillIdx} className="bg-gray-800 text-green-400 px-2 py-0.5 text-xs border border-gray-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProjectCard = ({ project = {}, index = 0 }) => (
  <div className="project-card bg-transparent border border-gray-700 p-4">
    <h3 className="text-green-400 text-base font-normal mb-2">{project?.title || `Project ${index + 1}`}</h3>
    <p className="text-gray-400 text-sm mb-2">{project?.description || "A sample project description."}</p>
    <div className="flex flex-wrap gap-1">
      {(Array.isArray(project?.technologies) ? project.technologies : ['React', 'Node.js']).map((tech, idx) => (
        <span key={idx} className="tech-tag px-2 py-0.5 bg-gray-800 text-green-400 text-xs border border-gray-700">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceItem = ({ experience = {}, index = 0 }) => (
  <div className="experience-item border-l-2 border-gray-700 pl-4 pb-4">
    <h3 className="text-green-400 text-base font-normal">{experience?.position || `Position ${index + 1}`}</h3>
    <div className="experience-meta text-gray-500 text-xs mb-2">
      {experience?.company || 'Company'} | {experience?.duration || '2023 - Present'}
    </div>
    <p className="experience-description text-gray-400 text-sm">
      {experience?.description || "Job description and key achievements."}
    </p>
  </div>
);

const FooterBlock = ({ socials = [] }) => {
  // Ensure socials is always an array with default values
  const socialLinks = Array.isArray(socials) && socials.length > 0 
    ? socials 
    : [{ name: 'GitHub', url: '#' }, { name: 'LinkedIn', url: '#' }];

  return (
    <div className="footer-block flex items-center gap-4">
      {socialLinks.map((social, idx) => (
        <a 
          key={idx} 
          href={social?.url || '#'} 
          className="social-link text-gray-400 hover:text-green-400 text-sm transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {social?.name || `Link ${idx + 1}`}
        </a>
      ))}
    </div>
  );
};

const TerminalLayout = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [isBooting, setIsBooting] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
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
        const resumeData = await axios.get(`/api/resume-data/${pid}`);
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
  // Available commands
  const commands = {
    help: 'Available commands: skills, projects, experience, contact, clear, exit',
    skills: 'SKILLS_SECTION',
    projects: 'PROJECTS_SECTION',
    experience: 'EXPERIENCE_SECTION',
    contact: 'CONTACT_SECTION',
    clear: 'CLEAR',
    exit: 'Thank you for visiting! Goodbye...'
  };

  // Initial boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      setIsBooting(true);
      
      // System boot
      await addToHistory('system boot', 'SYSTEM_BOOT', 100);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Loading
      await addToHistory('loading portfolio...', 'LOADING', 50);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Welcome
      await addToHistory('welcome', 'WELCOME', 100);
      
      setIsBooting(false);
    };
    bootSequence();
  }, []);

  // Helper function to add command to history with typing effect
  const addToHistory = async (command, output, delay = 0) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    if (delay > 0) {
      // Typing effect for automated commands
      for (let i = 0; i <= command.length; i++) {
        setCurrentCommand(command.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    setCommandHistory(prev => [...prev, { command, output, timestamp }]);
    setCurrentCommand('');
  };

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory, currentCommand]);

  const handleCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setCommandHistory([]);
      return;
    }
    
    let output = commands[trimmedCmd] || `Command not found: ${trimmedCmd}. Type 'help' for available commands.`;
    await addToHistory(cmd, output);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentCommand.trim() && !isBooting) {
      handleCommand(currentCommand);
    }
  };

  const handleTerminalClick = () => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const executeQuickCommand = async (cmd) => {
    if (!isBooting) {
      // Show typing effect for quick commands
      for (let i = 0; i <= cmd.length; i++) {
        setCurrentCommand(cmd.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      await new Promise(resolve => setTimeout(resolve, 200));
      handleCommand(cmd);
    }
  };
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error || !resumeData) {
    return <div className="flex justify-center items-center h-screen">Error: {error || "Resume data could not be loaded."}</div>;
  }
  const renderCommandOutput = (output) => {
    switch (output) {
      case 'ABOUT_SECTION':
        return (
          <div className="text-gray-300">
            <SummaryBlock summary={resumeData.summary} />
          </div>
        );
      
      case 'SKILLS_SECTION':
        return (
          <div className="text-gray-300">
            <div className="mb-2 text-yellow-400">{'>'} Technical Skills:</div>
            <SkillsBlock skills={resumeData.skills} />
          </div>
        );
      
      case 'PROJECTS_SECTION':
        return (
          <div className="space-y-4">
            <div className="text-yellow-400">{'>'} Projects:</div>
            {resumeData.projects?.map((project, idx) => (
              <div key={idx} className="ml-4">
                <ProjectCard project={project} index={idx} />
              </div>
            ))}
          </div>
        );
      
      case 'EXPERIENCE_SECTION':
        return (
          <div className="space-y-4">
            <div className="text-yellow-400">{'>'} Work Experience:</div>
            {resumeData.experience?.map((exp, idx) => (
              <div key={idx} className="ml-4">
                <ExperienceItem experience={exp} index={idx} />
              </div>
            ))}
          </div>
        );
      
      case 'CONTACT_SECTION':
        return (
          <div className="max-w-lg">
            <div className="text-yellow-400 mb-4">{'>'} Contact Form:</div>
            <ContactForm />
          </div>
        );
      
      case 'SYSTEM_BOOT':
        return (
          <div className="text-gray-400 space-y-1">
            <div>Initializing system...</div>
            <div className="flex items-center gap-2">
              <span>Loading kernel modules...</span>
              <span className="text-green-400">[OK]</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Mounting file systems...</span>
              <span className="text-green-400">[OK]</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Starting services...</span>
              <span className="text-green-400">[OK]</span>
            </div>
          </div>
        );
      
      case 'LOADING':
        return (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader className="animate-spin" size={16} />
            <span>Loading portfolio data...</span>
          </div>
        );
      
      case 'WELCOME':
        return (
          <div className="text-gray-300">
            <div className="mb-2 text-lg">{resumeData.landing?.headline}</div>
            <div className="text-sm text-gray-400 mb-4">{resumeData.landing?.subheadline}</div>
            <div className="text-yellow-400">Type 'help' to see available commands.</div>
          </div>
        );
      
      default:
        return <div className="text-gray-400">{output}</div>;
    }
  };

  return (
    <div className="terminal-layout min-h-screen bg-black text-green-400 font-mono">
      {/* Main Terminal Container */}
      <div className="h-screen flex flex-col p-2 sm:p-4">
        <div className="flex-1 bg-gray-900 rounded-lg shadow-2xl overflow-hidden flex flex-col">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-3 py-2 sm:px-4 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
              <TerminalIcon size={12} />
              <span className="hidden sm:inline">portfolio.sh</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="flex-1 p-2 sm:p-4 overflow-y-auto"
            onClick={handleTerminalClick}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#374151 #111827'
            }}
          >
            {/* ASCII Art Header - Responsive */}
            <pre className="text-green-300 text-[6px] sm:text-xs mb-4 overflow-x-auto">
{`
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
`}
            </pre>

            {/* Personal Info */}
            <div className="mb-4 text-amber-400">
              <div className="mb-1 text-sm sm:text-base">{'>'} {resumeData.personalInfo?.name} | {resumeData.personalInfo?.title}</div>
              <div className="text-xs sm:text-sm text-gray-400">{'>'} Located in: {resumeData.personalInfo?.location}</div>
              <div className="text-xs sm:text-sm text-gray-400">{'>'} Status: Available for hire</div>
            </div>

            {/* Command History */}
            {commandHistory.map((item, index) => (
              <div key={index} className="mb-4 animate-fade-in">
                <div className="flex items-start gap-2 flex-wrap sm:flex-nowrap">
                  <span className="text-gray-500 text-xs whitespace-nowrap">[{item.timestamp}]</span>
                  <span className="text-green-400">$</span>
                  <span className="text-white text-sm break-all">{item.command}</span>
                </div>
                
                {/* Command Output */}
                <div className="mt-2 ml-2 sm:ml-4">
                  {renderCommandOutput(item.output)}
                </div>
              </div>
            ))}

            {/* Current Command Line */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs whitespace-nowrap">
                [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
              </span>
              <span className="text-green-400">$</span>
              <div className="flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent outline-none text-white text-sm"
                  disabled={isBooting}
                  autoFocus={!isBooting}
                  style={{ caretColor: 'transparent' }}
                />
                <span className={`text-green-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                  _
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="mt-2 sm:mt-4">
          <div className="text-gray-500 text-xs sm:text-sm mb-2">Quick commands:</div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {[ 'skills', 'projects', 'experience', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeQuickCommand(cmd)}
                className="px-2 py-1 sm:px-3 bg-gray-800 text-green-400 text-xs sm:text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
                disabled={isBooting}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 px-2 sm:px-4 py-2">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <GitBranch size={12} />
              <span className="hidden sm:inline">main</span>
            </span>
            <span className="flex items-center gap-1">
              <Code size={12} />
              <span className="hidden sm:inline">v1.0.0</span>
            </span>
          </div>
          <FooterBlock socials={resumeData.footer?.socials} />
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap');
        
        .terminal-layout {
          font-family: 'Fira Code', monospace;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive font sizes */
        @media (max-width: 640px) {
          .terminal-layout {
            font-size: 14px;
          }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #111827;
        }

        ::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default TerminalLayout;