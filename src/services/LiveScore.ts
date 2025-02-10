import config from '../config';
import Cookies from 'js-cookie';
import { getUserFromToken } from "../services/AuthService";

const getAuthHeaders = () => {
    const token = Cookies.get('authToken');
    return new Headers({
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    });
};

const fetchData = async (endpoint, options) => {
    const response = await fetch(`${config.apiBaseUrl}/${endpoint}`, options);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return response.json();
};

export const getLiveScore = async() => {
      const token = Cookies.get('authToken');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${config.apiBaseUrl}/liveScore`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user matches');
      }

      return data;
}
