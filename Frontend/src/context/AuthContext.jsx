// contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session from OAuth callback
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // This would check with your backend for OAuth session
      const token = localStorage.getItem('authToken');
      if (token) {
        // Verify token with backend
        const userData = await fetchUserProfile(token);
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (token) => {
    // Simulate fetching user profile from backend
    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      provider: 'google',
      plan: 'free',
      portfolios: []
    };
  };

  const loginWithOAuth = (provider) => {
    // Redirect to backend OAuth endpoint
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/${provider}`;
  };

  const handleOAuthCallback = async (token) => {
    localStorage.setItem('authToken', token);
    const userData = await fetchUserProfile(token);
    setUser(userData);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    loading,
    loginWithOAuth,
    handleOAuthCallback,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};