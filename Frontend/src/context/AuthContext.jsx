// contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

// Configure axios instance for session-based auth
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Essential for session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not already on auth pages
      const authPaths = ['/login', '/auth/callback', '/auth/error'];
      const currentPath = window.location.pathname;
      
      if (!authPaths.some(path => currentPath.includes(path))) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Create context
export const AuthContext = createContext(null);

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated via session
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check session with backend
      const { data } = await axiosInstance.get('/api/auth/me');
      
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
      
      // Don't set error for 401s as it's expected when not logged in
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Authentication check failed');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize OAuth login
  const login = useCallback((provider = 'google') => {
    try {
      setError(null);
      
      // Store current location for post-login redirect
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/') {
        sessionStorage.setItem('authRedirectUrl', currentPath);
      }

      // Redirect to OAuth provider through backend
      window.location.href = `${API_BASE_URL}/api/auth/login/${provider}`;
    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to initiate login');
    }
  }, []);

  // Handle post-OAuth redirect (no token needed)
  const handleAuthSuccess = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user profile using session
      const { data } = await axiosInstance.get('/api/auth/me');
      
      if (data.success && data.user) {
        setUser(data.user);
        
        // Get redirect URL or default to dashboard
        const redirectUrl = sessionStorage.getItem('authRedirectUrl') || '/dashboard';
        sessionStorage.removeItem('authRedirectUrl');
        
        return { success: true, redirectUrl };
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (err) {
      console.error('Auth success handling failed:', err);
      setUser(null);
      setError(err.response?.data?.message || 'Authentication failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle OAuth errors
  const handleAuthError = useCallback((errorMessage) => {
    setError(errorMessage || 'Authentication failed');
    setUser(null);
    setLoading(false);
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Call backend logout to destroy session
      await axiosInstance.post('/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
      // Continue with local cleanup even if backend fails
    } finally {
      // Clear local state
      sessionStorage.clear();
      setUser(null);
      setLoading(false);
      
      // Redirect to home
      window.location.href = '/';
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      setError(null);
      
      const { data } = await axiosInstance.get('/api/auth/me');
      
      if (data.success && data.user) {
        setUser(data.user);
        return data.user;
      }
      
      throw new Error('Failed to refresh user data');
    } catch (err) {
      console.error('Refresh user failed:', err);
      setError(err.response?.data?.message || 'Failed to refresh user data');
      
      if (err.response?.status === 401) {
        setUser(null);
      }
      
      throw err;
    }
  }, []);

  // Update user profile
  const updateUser = useCallback(async (updates) => {
    try {
      setError(null);
      
      const { data } = await axiosInstance.patch('/api/auth/me', updates);
      
      if (data.success && data.user) {
        setUser(data.user);
        return data.user;
      }
      
      throw new Error('Failed to update user');
    } catch (err) {
      console.error('Update user failed:', err);
      setError(err.response?.data?.message || 'Failed to update user');
      throw err;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Context value
  const value = useMemo(() => ({
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    handleAuthSuccess,
    handleAuthError,
    refreshUser,
    updateUser,
    checkAuth,
    clearError,
  }), [user, loading, error, login, logout, handleAuthSuccess, handleAuthError, refreshUser, updateUser, checkAuth, clearError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for checking permissions
export const usePermission = (permission) => {
  const { user, isAuthenticated } = useAuth();
  
  return isAuthenticated && user?.permissions?.includes(permission);
};

// Hook for role-based access
export const useRole = () => {
  const { user, isAuthenticated } = useAuth();
  
  return {
    hasRole: (role) => isAuthenticated && user?.role === role,
    hasAnyRole: (roles) => isAuthenticated && roles.includes(user?.role),
    isAdmin: isAuthenticated && user?.role === 'admin',
    isSuperAdmin: isAuthenticated && user?.role === 'superadmin',
  };
};

// Protected Route Component
export const ProtectedRoute = ({ children, requiredRole, requiredPermission }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const { hasRole } = useRole();
  const hasPermission = usePermission(requiredPermission);
  
  if (loading) {
    return <div>Loading...</div>; // Replace with your loading component
  }
  
  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }
  
  if (requiredRole && !hasRole(requiredRole)) {
    return <div>Access Denied: Insufficient Role</div>; // Replace with your 403 component
  }
  
  if (requiredPermission && !hasPermission) {
    return <div>Access Denied: Missing Permission</div>; // Replace with your 403 component
  }
  
  return children;
};