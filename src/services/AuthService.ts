import config from '../config';
import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = (token?: string): string | null => {
  if (!token) {
    console.error("Token is missing");
    return null;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    return decodedToken["user_id"] || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
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
  console.log("After login: ", data);

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const signup = async (username: string, email: string, password: string) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  };
  const response = await fetch(`${config.apiBaseUrl}/auth/signup`, requestOptions);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Signup failed');
  }

  return data;
};
