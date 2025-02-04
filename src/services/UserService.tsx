import Cookies from 'js-cookie'; // Import js-cookie

const API_URL = 'http://192.168.2.14:8080/api/v1';

export const getUserDetails = async (userId: string) => {
  const token = Cookies.get('authToken'); // Get token from cookie
  console.log(token);
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Pass token in authorization header
    },
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const getUserMatches = async (userId: string) => {
  const token = Cookies.get('authToken'); // Get token from cookie
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(`${API_URL}/matches/user/${userId}`, requestOptions);
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user matches');
  }

  return data;
};

