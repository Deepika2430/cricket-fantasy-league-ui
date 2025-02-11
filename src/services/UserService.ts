import Cookies from 'js-cookie';
import config from '../config';
import { getUserFromToken } from './AuthService';


export const getUserDetailsById = async (userId: string) => {
  const token = Cookies.get('authToken');
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  const response = await fetch(`${config.apiBaseUrl}/user/`, requestOptions);

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

  const response = await fetch(`${config.apiBaseUrl}/matches/user`, requestOptions);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user matches');
  }

  return data;
};


export const getUserDetails = async () => {
  const token = Cookies.get('authToken');
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${config.apiBaseUrl}/user`, requestOptions);
    const result = await response.json();

    // Map the API response to the UserData structure
    return {
      username: result.data.Username,
      email: result.data.Email,
      profileImage: result.data.ProfilePictureURL
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateUserDetails = async (updatedData: any) => {
  try {
    const token = Cookies.get('authToken');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(updatedData),
    };

    const response = await fetch(`${config.apiBaseUrl}/users`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update user details:", errorData);
      throw new Error(errorData.message || "Failed to update user details");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const createTeam = async (teamData: any) => {
  const token = Cookies.get('authToken');
  const userId = await getUserFromToken(token);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({user_id: userId, ...teamData}),
  };
  try {
    const response = await fetch(`${config.apiBaseUrl}/userteams`, requestOptions);
    return (await response.json());
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }

}