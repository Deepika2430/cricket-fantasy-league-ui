import React, { useState } from 'react';
import { Search, Users, Plus, MessageCircle } from 'lucide-react';
import { useTheme } from "./ui/theme-provider";

interface Friend {
  id: string;
  name: string;
  imageUrl: string;
  selected?: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  imageUrl: string;
  lastActivity: string;
  preview?: string;
}

export default function GroupsComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const { theme } = useTheme();

  const [availableFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
      id: '2',
      name: 'Michael Chen',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    }
  ]);

  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Photography Club',
      description: 'Share and discuss photography techniques',
      memberCount: 128,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      lastActivity: '5 min ago',
      preview: 'Hey everyone! Check out my latest shoot...'
    },
    {
      id: '2',
      name: 'Book Club',
      description: 'Monthly book discussions and recommendations',
      memberCount: 56,
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
      lastActivity: '2 hours ago',
      preview: 'What did everyone think of chapter 5?'
    }
  ]);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle group creation logic here
    setShowCreateGroup(false);
    setGroupName('');
    setGroupDescription('');
  };

  return (
    <div className={`p-6 shadow-lg transition-colors w-full h-full ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Groups</h2>
        <button
          onClick={() => setShowCreateGroup(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Group</span>
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search groups..."
          className={`${theme === "dark" ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"} w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      {showCreateGroup ? (
        <div className={` ${theme === "dark" ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"} mb-8 p-4  rounded-lg transition-colors`}>
          <h3 className="text-xl font-semibold mb-4">Create New Group</h3>
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className={` ${theme === "dark" ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className={` ${theme === "dark" ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                rows={3}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 `}>Invite Friends</label>
              <div className="space-y-2">
                {availableFriends.map(friend => (
                  <div key={friend.id} className="flex items-center space-x-2">
                    <input type="checkbox" id={friend.id} className="rounded text-blue-600 " />
                    <label htmlFor={friend.id} className="flex items-center space-x-2">
                      <img src={friend.imageUrl} alt={friend.name} className="w-8 h-8 rounded-full" />
                      <span>{friend.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Group
              </button>
              <button
                type="button"
                onClick={() => setShowCreateGroup(false)}
                className={`px-4 py-2 ${theme === "dark" ? "bg-gray-600 text-gray-300 hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} rounded-lg transition-colors`}
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map(group => (
            <div key={group.id} className={`p-4 rounded-lg transition-colors ${theme === "dark" ? "bg-gray-800 hover:bg-gray-600" : "hover:bg-gray-100"}`}>
              <div className="flex items-start space-x-3">
                <img
                  src={group.imageUrl}
                  alt={group.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  <p className="text-sm mb-2">{group.description}</p>
                  <div className="flex items-center space-x-4 text-sm ">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {group.memberCount} members
                    </span>
                    <span>Active {group.lastActivity}</span>
                  </div>
                  {group.preview && (
                    <div className={` ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-600 hover:bg-white"} mt-2 p-2 rounded-lg text-sm flex items-start space-x-2`}>
                      <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="line-clamp-1">{group.preview}</p>
                    </div>
                  )}
                </div>
              </div>
              <button className={`mt-3 w-full px-4 py-2 rounded-lg transition-colors ${theme === "dark" ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}>
                Join Group
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}