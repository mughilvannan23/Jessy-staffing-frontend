import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('adminInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        setAdmin(res.data);
        localStorage.setItem('adminInfo', JSON.stringify(res.data));
        return { success: true };
      }
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminInfo');
  };

  const updateProfile = async (data) => {
    try {
      const res = await API.put('/auth/profile', data);
      if (res.data.success) {
        const updated = { ...admin, name: res.data.name, email: res.data.email };
        setAdmin(updated);
        localStorage.setItem('adminInfo', JSON.stringify(updated));
        return { success: true, message: 'Profile updated' };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
