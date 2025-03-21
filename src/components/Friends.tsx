import React, { useEffect, useState } from 'react';
import { Search, UserPlus, UserMinus, Check, X, Clock } from 'lucide-react';
import { useTheme } from "./ui/theme-provider";
import { getUsers, sendFriendRequest, removeFriend, getReceivedRequests, handleAcceptFriend } from '../services/Friends';

interface Friend {
  friend_id?: string;
  user_id: string;
  friend_name: string;
  status: 'online' | 'offline';
  profile_picture_url: string;
  isFriend: boolean;
  isPending?: boolean;
}

interface FriendRequest {
  user_id: string;
  friend_name: string;
  profile_picture_url: string;
}

export default function FriendsComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);

  const fetchUserFriends = async (): Promise<void> => {
    const response = await getUsers();
    const receivedRequests = await getReceivedRequests();
    setFriends(response.filter(friend => friend.status !== 'pending'));
    setReceivedRequests(receivedRequests);
    setSentRequests(response.filter(friend => friend.status === 'pending'));
  };

  useEffect(() => {
    fetchUserFriends();
    const interval = setInterval(() => {
      fetchUserFriends();
    }, 10000); // 10000ms = 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleSendFriendRequest = async (friend: Friend) => {
    try {
      await sendFriendRequest(friend.user_id, 'pending');
      await fetchUserFriends();
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleAcceptRequest = async (friend: Friend) => {
    try {
      await handleAcceptFriend(friend.user_id, friend.friend_user_id);
      await fetchUserFriends();
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleRemoveFriend = async (friend) => {
    try {
      console.log(friend)
      await removeFriend(friend?.user_id);
      await fetchUserFriends(); // Refresh the friends list
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const filteredFriends = friends.filter(friend =>
    friend?.friend_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-full h-full p-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Friends List */}
        <div className={`p-6 ${theme === "dark" ? 'bg-gray-800 text-white hover:scrollbar-thin  scrollbar-thumb-gray-700 scrollbar-track-gray-900' : 'bg-white text-gray-900 hover:scrollbar-thin scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'} rounded-xl shadow-lg transition-colors overflow-y-auto h-[600px] md:h-[530px] scrollbar-none `}>
          <h2 className="text-2xl font-bold mb-4">Friends</h2>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search friends..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${theme === "dark"
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500 placeholder-gray-400'
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500 placeholder-gray-500'
                }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          <div className="space-y-4">
            {filteredFriends?.map(friend => (
              <div key={friend.user_id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${theme === "dark"
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                <div className="flex items-center space-x-3">
                  <img
                    src={friend.profile_picture_url}
                    alt={friend.friend_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{friend.friend_name}</h3>
                    {/* <div className="flex items-center space-x-1">
                      <Circle className={`w-3 h-3 ${friend.status === 'online' ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}`} />
                      <span className="text-sm">{friend.status}</span>
                    </div> */}
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors ${friend.isFriend
                    ? `bg-red-100 ${theme === "dark" ? "bg-red-900/30 hover:bg-red-900/50 text-red-400" : "text-red-600 hover:bg-red-200"}`
                    : `bg-blue-100 ${theme === "dark" ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50" : "text-blue-600 hover:bg-blue-200"}`
                    }`}
                  onClick={() => friend.isFriend ? handleRemoveFriend(friend) : handleSendFriendRequest(friend)}
                >
                  {friend.isFriend ? (
                    <>
                      <UserMinus className="w-4 h-4" />
                      <span>Remove</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Received Requests */}
          <div className={`p-6 ${theme === "dark" ? 'bg-gray-800 text-white hover:scrollbar-thin  scrollbar-thumb-gray-700 scrollbar-track-gray-900' : 'bg-white text-gray-900 hover:scrollbar-thin scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'} rounded-xl shadow-lg transition-colors overflow-y-auto h-[300px] md:h-[250px] scrollbar-none `}>
            <h2 className="text-2xl font-bold mb-4">Received Requests</h2>
            <div className="space-y-4">
              {receivedRequests?.map(request => (
                <div key={request?.user_id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${theme === "dark"
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                  <div className="flex items-center space-x-3">
                    <img
                      src={request?.profile_picture_url}
                      alt={request?.friend_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <h3 className="font-semibold">{request?.friend_name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`p-2 ${theme === "dark" ? "bg-green-900/30 text-green-400 hover:bg-green-900/50" : "bg-green-100 text-green-600 hover:bg-green-200"} rounded-lg transition-colors`}
                    onClick={() => handleAcceptRequest(request)}>
                      <Check className="w-5 h-5" />
                    </button>
                    <button className={`p-2 ${theme === "dark" ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" : "bg-red-100 text-red-600 hover:bg-red-200"} rounded-lg transition-colors`} onClick={() => handleRemoveFriend(request)}>
                      <X className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              ))}
              {receivedRequests?.length === 0 && (
                <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-center py-4`}>No pending friend requests</p>
              )}
            </div>
          </div>

          {/* Sent Requests (Pending Only) */}
          <div className={`p-6 ${theme === "dark" ? 'bg-gray-800 text-white hover:scrollbar-thin  scrollbar-thumb-gray-700 scrollbar-track-gray-900' : 'bg-white text-gray-900 hover:scrollbar-thin scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'} rounded-xl shadow-lg transition-colors overflow-y-auto h-[300px] md:h-[250px] scrollbar-none `}>
            <h2 className="text-2xl font-bold mb-4">Sent Requests</h2>
            <div className="space-y-4">
              {sentRequests.map(request => (
                <div key={request.user_id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${theme === "dark"
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                  <div className="flex items-center space-x-3">
                    <img
                      src={request.profile_picture_url}
                      alt={request.friend_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{request.friend_name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className={`text-sm px-2 py-1 rounded-full ${theme === "dark"
                          ? "text-yellow-400 bg-yellow-900/30"
                          : "text-yellow-600 bg-yellow-100"}`}>
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`p-2 ${theme === "dark" ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" : "bg-red-100 text-red-600 hover:bg-red-200"} rounded-lg transition-colors`}
                    onClick={() => handleRemoveFriend(request)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {sentRequests.length === 0 && (
                <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-center py-4`}>No pending sent requests</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
