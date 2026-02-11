import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ email });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('email', res.data.email);
    setUser({ email: res.data.email });
    return res;
  };

  const signup = async (email, password) => {
    return await api.post('/auth/register', { email, password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser(null);
  };

  const value = { user, login, signup, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};