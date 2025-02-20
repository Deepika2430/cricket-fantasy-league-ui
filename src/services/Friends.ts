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

export const getUsers = async () => {
    const headers = getAuthHeaders();
    const requestOptions = { method: "GET", headers, redirect: "follow" };

    const [friendsRes, usersRes] = await Promise.all([
        fetchData("friends", requestOptions),
        fetchData("users", requestOptions)
    ]);

    const friends = friendsRes?.data || [];
    const users = usersRes?.data || [];
    const currentUserId = getUserFromToken(Cookies.get('authToken'));

    const friendIds = new Set(friends.map(friend => friend.friend_user_id));

    const modifiedFriends = friends.map(friend => ({
        friend_id: friend.friend_id,
        user_id: friend.friend_user_id,
        friend_name: friend.friend_name,
        status: friend.status,
        profile_picture_url: friend.profile_picture_url,
        isFriend: true
    }));

    const modifiedUsers = users
        .filter(user => user.ID !== currentUserId && !friendIds.has(user.ID))
        .map(user => ({
            user_id: user.ID,
            friend_name: user.Username,
            profile_picture_url: user.ProfilePictureURL,
            isFriend: false
        }));

    return [...modifiedFriends, ...modifiedUsers];
};

export const getFriends = async () => {
    const headers = getAuthHeaders();
    const requestOptions = { method: "GET", headers, redirect: "follow" };
    return fetchData("friends", requestOptions);
};

export const sendFriendRequest = async (friendUserId, status) => {
    const requestOptions = {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ friend_user_id: friendUserId, status }),
        redirect: "follow"
    };
    return fetchData("friends", requestOptions);
};

export const removeFriend = async (friendUserId) => {
    const token = Cookies.get('authToken');
    const myHeaders = new Headers();
    const userId = getUserFromToken(token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const raw = JSON.stringify({
        "user_id": userId,
        "friend_user_id": friendUserId
    });

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const response = await fetchData(`friends`, requestOptions);
    return { message: "Friend removed successfully" };
};

export const getReceivedRequests = async () => {
    const requestOptions = { method: "GET", headers: getAuthHeaders(), redirect: "follow" };
    const response = await fetchData(`friends/requests`, requestOptions);

    const requests = response?.data?.map((request) => {
        return {
            isFriend: false,
            friend_id: request.friend_id,
            user_id: request.user_id,
            friend_user_id: request.friend_user_id,
            status: request.status,
            friend_name: request.username,
        }
    })
    return requests;
}

export const handleAcceptFriend = async (user_id: string, friend_user_id: string) => {
    console.log(user_id, friend_user_id);
    const token = Cookies.get('authToken');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
        "user_id": user_id,
        "friend_user_id": friend_user_id
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    return fetchData("friends", requestOptions);
}