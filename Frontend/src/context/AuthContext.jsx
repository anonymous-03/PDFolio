// contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Important for cookies/sessions

// Add auth token to all requests if it exists
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
      const token = localStorage.getItem('authToken');

      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token with backend and get user profile
      const response = await axios.get('/api/auth/me');

      if (response.data.success && response.data.user) {
        setUser(response.data.user);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('authToken');
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);

      // If unauthorized, clear token
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
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
      // Store the current URL to redirect back after login
      if(window.location.pathname !== '/login') {
        sessionStorage.setItem('redirectUrl', window.location.pathname);
      }

      // Redirect to backend OAuth endpoint
      window.location.href = `${API_BASE_URL}/auth/login/${provider}`;
    } catch (error) {
      console.error('OAuth login initiation failed:', error);
      setError('Failed to initiate login');
    }
  };

  const handleOAuthCallback = async (token) => {
    try {
      setLoading(true);
      setError(null);

      // Store the token
      localStorage.setItem('authToken', token);

      // Fetch user profile with the new token
      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      if (response.data.success && response.data.user) {
        setUser(response.data.user);

        // Redirect to dashboard or previously stored URL
        const redirectUrl = sessionStorage.getItem('redirectUrl') || '/dashboard';
        sessionStorage.removeItem('redirectUrl');
        window.location.href = redirectUrl;
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('OAuth callback handling failed:', error);
      setError(error.response?.data?.message || 'Authentication failed');
      localStorage.removeItem('authToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call backend logout endpoint
      await axios.get('/api/auth/logout');

      // Clear local state and storage
      localStorage.removeItem('authToken');
      setUser(null);

      // Redirect to home
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if backend logout fails, clear local session
      localStorage.removeItem('authToken');
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
  }, [loginWithOAuth, logout, refreshUserProfile]);
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