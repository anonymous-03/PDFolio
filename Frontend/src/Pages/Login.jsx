// pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiArrowLeft } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { SiLinkedin } from 'react-icons/si';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { loginWithOAuth } = useAuth();

  

  const providers = [
    {
      name: 'Google',
      icon: <FcGoogle className="w-6 h-6" />,
      provider: 'google',
      bgColor: 'hover:bg-gray-50'
    },
  ];

  return (
    <div id='login'className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Back to Home */}
        <div className="absolute top-8 left-8">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to home
          </Link>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">PDFolio</h1>
          <p className="text-gray-600">Transform your resume into a stunning portfolio</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue to your dashboard</p>
            </div>

            {/* OAuth Providers */}
            <div className="space-y-3">
              {providers.map((provider) => (
                <motion.button
                  key={provider.provider}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => loginWithOAuth(provider.provider)}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 transition-all ${provider.bgColor}`}
                >
                  {provider.icon}
                  Continue with {provider.name}
                </motion.button>
              ))}
            </div>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  No password needed - secure OAuth authentication
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  Quick sign in with your existing accounts
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  Your data is always secure and private
                </p>
              </div>
            </div>

            {/* Terms */}
            <p className="mt-8 text-xs text-center text-gray-500">
              By continuing, you agree to our{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Sign Up Link */}
          {/* <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
              Sign up for free
            </Link>
          </p> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;