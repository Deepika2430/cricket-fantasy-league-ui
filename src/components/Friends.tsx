import React, { useState } from 'react';
import { Search, UserPlus, UserMinus, Check, X, Circle } from 'lucide-react';
import { useTheme } from "./ui/theme-provider";

interface Friend {
  id: string;
  name: string;
  status: 'online' | 'offline';
  imageUrl: string;
  isFriend: boolean;
}

interface FriendRequest {
  id: string;
  name: string;
  imageUrl: string;
}

export default function FriendsComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();

  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      status: 'online',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      isFriend: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      status: 'offline',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      isFriend: false
    }
  ]);

  const [friendRequests] = useState<FriendRequest[]>([
    {
      id: '3',
      name: 'Emma Thompson',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    }
  ]);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-full h-full p-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Friends List */}
        <div className={`p-6 ${theme === "dark" ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-xl shadow-lg transition-colors`}>
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
            {filteredFriends.map(friend => (
              <div key={friend.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${theme === "dark"
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                <div className="flex items-center space-x-3">
                  <img
                    src={friend.imageUrl}
                    alt={friend.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{friend.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Circle className={`w-3 h-3 ${friend.status === 'online' ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}`} />
                      <span className="text-sm">{friend.status}</span>
                    </div>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors ${friend.isFriend
                    ? `bg-red-100 ${theme === "dark" ? "bg-red-900/30 hover:bg-red-900/50 text-red-400" : "text-red-600 hover:bg-red-200"}`
                    : `bg-blue-100 ${theme === "dark" ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50" : "text-blue-600 hover:bg-blue-200"}`
                    }`}
                >
                  {friend.isFriend ? (
                    <>
                      <UserMinus className="w-4 h-4" />
                      <span></span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span></span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Friend Requests */}
        <div className={`p-6 ${theme === "dark" ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-xl shadow-lg transition-colors`}>
          <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>
          <div className="space-y-4">
            {friendRequests.map(request => (
              <div key={request.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${theme === "dark"
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                <div className="flex items-center space-x-3">
                  <img
                    src={request.imageUrl}
                    alt={request.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h3 className="font-semibold">{request.name}</h3>
                </div>
                <div className="flex space-x-2">
                  <button className={`p-2 ${theme === "dark" ? "bg-green-900/30 text-green-400 hover:bg-green-900/50 " : "bg-green-100 text-green-600 hover:bg-green-200"}  rounded-lg  transition-colors`}>
                    <Check className="w-5 h-5" />
                  </button>
                  <button className={`p-2 ${theme === "dark" ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" : "bg-red-100 text-red-600 hover:bg-red-200"} rounded-lg transition-colors`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {friendRequests.length === 0 && (
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-center py-4`}>No pending friend requests</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
