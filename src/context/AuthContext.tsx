import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserFromToken } from '../services/AuthService';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  role: string | null;
  setToken: (token: string, role: string) => void; // Update setToken to accept role
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState({ userId: null, token: null, role: null });

  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      const extractedUserId = getUserFromToken(storedToken);
      setAuthState({ userId: extractedUserId, token: storedToken, role: null });
    }
  }, []);

  const setToken = (token: string, role: string) => { // Include role parameter
    Cookies.set('authToken', token, { secure: true, sameSite: 'Strict', expires: 1 });
    Cookies.set('role', role, { secure: true, sameSite: 'Strict', expires: 1 });
    const extractedUserId = getUserFromToken(token);
    console.log('Extracted User ID:', extractedUserId);
    console.log('Role:', role);
    setAuthState({ userId: extractedUserId, token, role }); // Set role in auth state
  };

  const logout = () => {
    Cookies.remove('authToken');
    Cookies.remove('token');
    setAuthState({ userId: null, token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
