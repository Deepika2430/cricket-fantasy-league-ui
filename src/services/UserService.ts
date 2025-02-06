import Cookies from 'js-cookie';
import config from '../config';


export const getUserDetailsById = async (userId: string) => {
  const token = Cookies.get('authToken');
  const requestOptions: RequestInit= {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  const response = await fetch(`${config.apiBaseUrl}/users/${userId}`, requestOptions);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const getUserMatches = async (userId: string) => {
  const token = Cookies.get('authToken');
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(`${config.apiBaseUrl}/matches/user/${userId}`, requestOptions);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user matches');
  }

  return data;
};

