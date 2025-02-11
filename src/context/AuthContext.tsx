import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserFromToken } from '../services/AuthService';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setTokenState(storedToken);
      const extractedUserId = getUserFromToken(storedToken);
      setUserId(extractedUserId);
    }
  }, []);

  const setToken = (token: string) => {
    Cookies.set('authToken', token, { secure: true, sameSite: 'Strict', expires: 1 });
    setTokenState(token);
    const extractedUserId = getUserFromToken(token);
    setUserId(extractedUserId);
  };

  const logout = () => {
    Cookies.remove('authToken');
    setTokenState(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, setToken, logout }}>
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
