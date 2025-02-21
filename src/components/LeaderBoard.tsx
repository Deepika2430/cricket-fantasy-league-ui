import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Star, Award, Crown } from 'lucide-react';
import { useTheme } from "./ui/theme-provider";
import { getLeaderboardData, getCurrentUserId } from '../services/LeaderBoard';

interface LeaderboardEntry {
  user_id: string;
  username: string;
  profile_picture_url: string;
  total_points: number;
  rank: number;
  matches_played: number;
}

export default function LeaderboardComponent() {
  const { theme } = useTheme();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const data = await getLeaderboardData();
      setLeaderboardData(data);
    };

    fetchLeaderboardData();
    const interval = setInterval(fetchLeaderboardData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-700" />;
      default:
        return <Star className="w-6 h-6 text-blue-500" />;
    }
  };

  const getCurrentUserRank = () => {
    const currentUser = leaderboardData.find(entry => entry.user_id === currentUserId);
    return currentUser?.rank || 0;
  };

  return (
    <div className={`w-full h-full p-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className={`p-6 ${
        theme === "dark"
          ? 'bg-gray-800 text-white'
          : 'bg-white text-gray-900'
        } rounded-xl shadow-lg transition-colors`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className={`w-6 h-6 ${theme === "dark" ? "text-yellow-500" : "text-yellow-600"}`} />
            Leaderboard
          </h2>
          <div className={`px-4 py-2 rounded-lg ${
            theme === "dark"
              ? 'bg-indigo-900/30 text-indigo-400'
              : 'bg-indigo-100 text-indigo-600'
          }`}>
            <span className="font-semibold flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Your Rank: #{getCurrentUserRank()}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((entry) => (
            <div
              key={entry.user_id}
              className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                entry.user_id === currentUserId
                  ? theme === "dark"
                    ? 'bg-indigo-900/30 hover:bg-indigo-900/40'
                    : 'bg-indigo-50 hover:bg-indigo-100'
                  : theme === "dark"
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  entry.rank <= 3
                    ? 'bg-yellow-500/20'
                    : theme === "dark"
                      ? 'bg-gray-600'
                      : 'bg-gray-200'
                }`}>
                  {getRankIcon(entry.rank)}
                </div>
                <img
                  src={entry.profile_picture_url}
                  alt={entry.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{entry.username}</h3>
                    {entry.user_id === currentUserId && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        theme === "dark"
                          ? 'bg-indigo-900/50 text-indigo-400'
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Matches Played: {entry.matches_played}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-lg ${
                  theme === "dark"
                    ? 'bg-blue-900/30 text-blue-400'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  <span className="font-semibold">{entry.total_points.toLocaleString()} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}