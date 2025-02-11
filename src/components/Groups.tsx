import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Search, Users, Plus } from "lucide-react";
import { useTheme } from "./ui/theme-provider";
import { getFriends } from "../services/Friends";
import { getMatches } from "../services/Matches";
import { createGroup } from "../services/Groups";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from "react-router-dom";

interface Friend {
  friend_id: string;
  user_id: string;
  friend_name: string;
}

interface Match {
  match_id: string;
  name: string;
  team1: {
    team_name: string;
  };
  team2: {
    team_name: string;
  };
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
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMatch, setSelectedMatch] = useState("");

  const [availableFriends, setAvailableFriends] = useState<Friend[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);


  useEffect(() => {
    const availableFriends = async () => {
      const response = await getFriends();
      setAvailableFriends(response?.data);
      console.log(response?.data);
    }
    availableFriends();

    const upcomingMatches = async () => {
      const response = await getMatches();
      setUpcomingMatches(response);
      console.log(response);
    }
    upcomingMatches();
  }, []);

  const handleFriendSelection = (friendId: string) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.includes(friendId)
        ? prevSelected.filter((id) => id !== friendId)
        : [...prevSelected, friendId]
    );
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(availableFriends);

    if (!groupName || !selectedMatch) {
      alert("Please fill all fields before creating a group.");
      return;
    }

    const groupData = {
      name: groupName,
      group_members: selectedFriends.map(friend_id => {
        const friend = availableFriends.find(f => f.friend_id === friend_id);
        return friend ? { ...friend, status: "pending" } : null;
      }).filter(Boolean)
    };


    console.log("Creating group with data:", groupData);

    try {
      const response = await createGroup(groupData);
      console.log("Group created successfully:", response);
      toast.success('Team created successfully!', {
        onClose: () => navigate("/groups"), // Navigate after toast disappears
        autoClose: 2000, // Wait for 2 seconds before closing
      });
      // alert("Group created successfully!");

      // Reset form
      setShowCreateGroup(false);
      setGroupName("");
      setSelectedMatch("");
      setSelectedFriends([]);
    } catch (error) {
      toast.error(`Failed to create team: ${error}`);
      // alert("Failed to create group. Please try again.");
    }
    setShowCreateGroup(false);
    setGroupName("");
    setSelectedMatch("");
  };

  const filteredGroups = [
    {
      id: "1",
      name: "Photography Club",
      description: "Share and discuss photography techniques",
      memberCount: 128,
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      lastActivity: "5 min ago",
      preview: "Hey everyone! Check out my latest shoot...",
    },
    {
      id: "2",
      name: "Book Club",
      description: "Monthly book discussions and recommendations",
      memberCount: 56,
      imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      lastActivity: "2 hours ago",
      preview: "What did everyone think of chapter 5?",
    },
  ].filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div
      className={`p-6 shadow-lg transition-colors w-full h-full ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
    >
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
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${theme === "dark"
            ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
            : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>
      <ToastContainer />
      {showCreateGroup ? (
        <div className={`mb-8 p-4 rounded-lg transition-colors ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
          <h3 className="text-xl font-semibold mb-4">Create New Group</h3>
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Group Name"
              required
            />

            <select
              value={selectedMatch}
              onChange={(e) => setSelectedMatch(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select a match</option>
              {Array.isArray(upcomingMatches) && upcomingMatches.map(match => (
                <option key={match.match_id} value={match.match_id}>{`${match.team1.team_name} VS ${match.team2.team_name}`}</option>
              ))}
            </select>

            <div className="space-y-2">
              {availableFriends?.map((friend) => (
                <div key={friend.friend_id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={friend.friend_id}
                    className="rounded text-blue-600"
                    checked={selectedFriends.includes(friend.friend_id)}
                    onChange={() => handleFriendSelection(friend.friend_id)}
                  />
                  <label htmlFor={friend.friend_id} className="flex items-center space-x-2">
                    <span>{friend.friend_name}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Create Group
              </button>
              <button onClick={() => setShowCreateGroup(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGroups.map((group) => (
            <div key={group.id} className="p-4 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-start space-x-3">
                <img src={group.imageUrl} alt={group.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  <p className="text-sm">{group.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" /> {group.memberCount} members
                    </span>
                    <span>Active {group.lastActivity}</span>
                  </div>
                  {group.preview && <div className="mt-2 p-2 rounded-lg text-sm bg-gray-50">{group.preview}</div>}
                </div>
              </div>
              <button className="mt-3 w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
                Join Group
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}