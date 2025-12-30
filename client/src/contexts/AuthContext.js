import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  // Load user
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      
      try {
        const res = await axios.get('/api/auth/me');
        dispatch({
          type: 'USER_LOADED',
          payload: res.data
        });
      } catch (err) {
        console.error('Error loading user:', err);
        dispatch({ type: 'AUTH_ERROR' });
      }
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });
      loadUser();
      return { success: true };
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.message
      });
      return { success: false, error: err.response.data.message };
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      
      // Set token and update state
      setAuthToken(res.data.token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      
      // Load user data
      await loadUser();
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.message || 'Login failed'
      });
      return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  // Logout
  const logout = () => {
    setAuthToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};