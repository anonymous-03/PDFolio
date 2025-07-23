
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';
const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const { user } = useContext(AuthContext);
  const { currentTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    setError('');

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(file);
  };

  const removeFile = () => {
    setFile(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // Simulate file upload
      //   console.log(user.id);
      // console.log(file);
      const formData = new FormData();
      formData.append('resume', file);
      const resumeData = await axios.post('/api/upload-resume', formData);

      // console.log(resumeData.data);
      if(resumeData.data.personalInfo===undefined){
        alert("Please upload resume again");
        setUploading(false);
        navigate('/upload');
        return;
      }


      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setParsing(true);
      setUploading(false);

      // Simulate parsing delay
      await new Promise(resolve => setTimeout(resolve, 3000));



      setParsedData(resumeData.data);
      setParsing(false);

      // Store parsed data in session storage
      sessionStorage.setItem('parsedResumeData', JSON.stringify(resumeData.data));

      // Redirect to template selection after short delay
      setTimeout(() => {
        navigate('/select-template');
      }, 1500);

    } catch (err) {
      console.log(err);
      setError('Failed to upload resume. Please try again.');
      setUploading(false);
      setParsing(false);
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${currentTheme.bgClass} transition-all duration-500`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${currentTheme.primary}`}>
            Upload Your Resume
          </h1>
          <p className={`text-lg ${currentTheme.text} opacity-80`}>
            Let AI transform your resume into a stunning portfolio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`${currentTheme.cardBg} rounded-2xl p-8 ${currentTheme.cardShadow}`}
        >
          {!file && !parsing && !parsedData && (
            <div
              className={`border-2 border-dashed ${dragActive ? currentTheme.borderColor : 'border-gray-300'} 
                rounded-xl p-12 text-center transition-all duration-300
                ${dragActive ? 'scale-105' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className={`w-16 h-16 mx-auto mb-4 ${currentTheme.text} opacity-50`} />
              <h3 className={`text-xl font-semibold mb-2 ${currentTheme.text}`}>
                Drag and drop your resume here
              </h3>
              <p className={`${currentTheme.text} opacity-70 mb-4`}>
                or
              </p>
              <label className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-6 py-3 
                rounded-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity
                inline-block`}>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleChange}
                />
                Choose PDF File
              </label>
              <p className={`mt-4 text-sm ${currentTheme.text} opacity-50`}>
                Maximum file size: 5MB
              </p>
            </div>
          )}

          {file && !uploading && !parsing && !parsedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className={`${currentTheme.cardBg} rounded-lg p-6 mb-6 
                border ${currentTheme.borderColor}`}>
                <FileText className={`w-12 h-12 mx-auto mb-3 ${currentTheme.primary}`} />
                <h4 className={`font-semibold ${currentTheme.text} mb-1`}>
                  {file.name}
                </h4>
                <p className={`text-sm ${currentTheme.text} opacity-70`}>
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <button
                  onClick={removeFile}
                  className={`mt-3 text-red-500 hover:text-red-600 transition-colors`}
                >
                  <X className="w-5 h-5 inline mr-1" />
                  Remove
                </button>
              </div>

              <button
                onClick={handleUpload}
                className={`${currentTheme.buttonBg} ${currentTheme.buttonText} px-8 py-3 
                  rounded-lg font-semibold hover:opacity-90 transition-all duration-300`}
              >
                Upload and Parse Resume
              </button>
            </motion.div>
          )}

          {(uploading || parsing) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Loader className={`w-12 h-12 mx-auto mb-4 ${currentTheme.primary} animate-spin`} />
              <h3 className={`text-xl font-semibold mb-2 ${currentTheme.text}`}>
                {uploading ? 'Uploading Resume...' : 'Parsing Resume Content...'}
              </h3>
              <p className={`${currentTheme.text} opacity-70`}>
                {uploading ? 'Please wait while we upload your file' : 'AI is analyzing your resume'}
              </p>
            </motion.div>
          )}

          {parsedData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className={`w-16 h-16 mx-auto mb-4 text-green-500`} />
              <h3 className={`text-2xl font-bold mb-2 ${currentTheme.text}`}>
                Resume Parsed Successfully!
              </h3>
              <p className={`${currentTheme.text} opacity-70 mb-4`}>
                Redirecting to template selection...
              </p>
              <div className={`mt-6 p-4 ${currentTheme.cardBg} rounded-lg border ${currentTheme.borderColor}`}>
                <p className={`text-sm ${currentTheme.text} opacity-70`}>Detected:</p>
                <p className={`font-semibold ${currentTheme.text}`}>{parsedData.personalInfo
                  .name}</p>
                <p className={`${currentTheme.text} opacity-80`}>{parsedData.personalInfo
.title}</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.cardShadow}`}>
            <FileText className={`w-8 h-8 ${currentTheme.primary} mb-3`} />
            <h4 className={`font-semibold mb-2 ${currentTheme.text}`}>PDF Format</h4>
            <p className={`text-sm ${currentTheme.text} opacity-70`}>
              Ensure your resume is in PDF format for best parsing results
            </p>
          </div>
          <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.cardShadow}`}>
            <CheckCircle className={`w-8 h-8 ${currentTheme.primary} mb-3`} />
            <h4 className={`font-semibold mb-2 ${currentTheme.text}`}>Clear Structure</h4>
            <p className={`text-sm ${currentTheme.text} opacity-70`}>
              Well-structured resumes with clear sections parse better
            </p>
          </div>
          <div className={`${currentTheme.cardBg} p-6 rounded-xl ${currentTheme.cardShadow}`}>
            <AlertCircle className={`w-8 h-8 ${currentTheme.primary} mb-3`} />
            <h4 className={`font-semibold mb-2 ${currentTheme.text}`}>File Size</h4>
            <p className={`text-sm ${currentTheme.text} opacity-70`}>
              Keep your resume under 5MB for faster processing
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeUpload;