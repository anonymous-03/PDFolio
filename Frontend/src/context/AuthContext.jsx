// contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Important for session cookies

export const AuthContext = createContext({});

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
  const [error, setError] = useState(null);

  const checkAuthStatus = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/auth/me'); // session-based

      if (response.data.success && response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      if (error.response?.status === 401) {
        setUser(null);
      }
      setError(error.response?.data?.message || 'Authentication check failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithOAuth = (provider = 'google') => {
    try {
      setError(null);
      if (window.location.pathname !== '/login') {
        sessionStorage.setItem('redirectUrl', window.location.pathname);
      }
      window.location.href = `${API_BASE_URL}/auth/login/${provider}`;
    } catch (error) {
      console.error('OAuth login initiation failed:', error);
      setError('Failed to initiate login');
    }
  };

  const handleOAuthCallback = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/auth/me'); // will be valid if session is active

      if (response.data.success && response.data.user) {
        setUser(response.data.user);

        const redirectUrl = sessionStorage.getItem('redirectUrl') || '/dashboard';
        sessionStorage.removeItem('redirectUrl');
        window.location.href = redirectUrl;
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('OAuth callback handling failed:', error);
      setError(error.response?.data?.message || 'Authentication failed');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      await axios.get('/api/auth/logout'); // logs out from session
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      setUser(null);
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/auth/me');

      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        return response.data.user;
      }
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
      setError(error.response?.data?.message || 'Failed to refresh profile');
      throw error;
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    user,
    loading,
    error,
    loginWithOAuth,
    handleOAuthCallback,
    logout,
    refreshUserProfile,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
