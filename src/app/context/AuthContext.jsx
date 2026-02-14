import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored token and validate
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Demo mode - restore user from token (in production, fetch from API)
      if (token.startsWith('demo-jwt-token-')) {
        // Restore demo user
        const demoUser = {
          id: 1,
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'contributor',
        };
        setUser(demoUser);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        fetchUser();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      // Real API call - replace with actual implementation
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Demo mode - simulate successful login for any credentials
      if (email && password) {
        const mockUser = {
          id: 1,
          name: 'Demo User',
          email: email,
          role: 'contributor',
        };
        const mockToken = 'demo-jwt-token-' + Date.now();
        
        localStorage.setItem('token', mockToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setUser(mockUser);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Demo mode - simulate successful registration
      if (name && email && password) {
        const mockUser = {
          id: Date.now(),
          name: name,
          email: email,
          role: 'contributor',
        };
        const mockToken = 'demo-jwt-token-' + Date.now();
        
        localStorage.setItem('token', mockToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setUser(mockUser);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    userRole: user?.role || 'user', // user, historian, admin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};