import React, { createContext, useState, useContext, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(storedToken);
      } else {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credential })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Google authentication failed');
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    googleLogin,
    logout,
    isAuthenticated: !!user,
    hasRole: (roles) => {
      if (!user) return false;
      if (Array.isArray(roles)) {
        return roles.includes(user.role);
      }
      return user.role === roles;
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
