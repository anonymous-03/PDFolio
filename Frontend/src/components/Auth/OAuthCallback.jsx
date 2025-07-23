// components/OAuthCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    const handleSessionCheck = async () => {
      try {
        await handleOAuthCallback(); // calls /api/auth/me and sets user
      } catch (err) {
        console.error('OAuth callback failed:', err);
        navigate('/login?error=Authentication failed');
      }
    };

    handleSessionCheck();
  }, [handleOAuthCallback, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
