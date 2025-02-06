import config from '../config';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

export const getUserFromToken = async (token: string) => {
  const tokenDetails = jwtDecode(token);
  const userId = tokenDetails?.['user_id'];
  return userId;
};

export const login = async (email: string, password: string) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(`${config.apiBaseUrl}/auth/login`, requestOptions);

  const data = await response.json();

  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const signup = async (username: string, email: string, password: string, name: string) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, name }),
  };
  const response = await fetch(`${config.apiBaseUrl}/auth/signup`, requestOptions);

  const data = await response.json();

  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || 'Signup failed');
  }

  return data;
};
