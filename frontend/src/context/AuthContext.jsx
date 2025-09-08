// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signup = async (form) => {
    try {
      const res = await api.post('/auth/signup', form);
      setUser(res.data.user);
      toast.success('Signup successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
      throw err;
    }
  };

  const login = async (form) => {
    try {
      const res = await api.post('/auth/login', form);
      setUser(res.data.user);
      toast.success(`Welcome ${res.data.user.name || 'user'}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    toast('Logged out');
    navigate('/login'); // redirect here
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
