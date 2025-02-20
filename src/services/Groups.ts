import config from '../config';
import Cookies from 'js-cookie';

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

export const getGroups = async () => {
    const requestOptions = {
        method: "GET",
        headers: getAuthHeaders(),
        redirect: "follow"
    };
    return fetchData("groups", requestOptions);
}

export const createGroup = async (groupData) => {
    const requestOptions = {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(groupData),
        redirect: "follow"
    };
    return fetchData("groups", requestOptions);
};