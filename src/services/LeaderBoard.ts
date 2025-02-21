interface LeaderboardEntry {
  user_id: string;
  username: string;
  profile_picture_url: string;
  total_points: number;
  matches_played: number;
}

interface RankedLeaderboardEntry extends LeaderboardEntry {
  rank: number;
}

// Simulated data for now - replace with actual API call later
export const getLeaderboardData = async (): Promise<RankedLeaderboardEntry[]> => {
  // Static data for demonstration
  const currentUserId = "2"; // This would come from your auth system

  const rawData: LeaderboardEntry[] = [
    {
      user_id: "1",
      username: "Sarah Connor",
      profile_picture_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      total_points: 9850,
      matches_played: 42
    },
    {
      user_id: "2", // Current user
      username: "John Smith",
      profile_picture_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      total_points: 9200,
      matches_played: 38
    },
    {
      user_id: "3",
      username: "Emma Wilson",
      profile_picture_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      total_points: 8900,
      matches_played: 35
    },
    {
      user_id: "4",
      username: "Michael Chen",
      profile_picture_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      total_points: 8500,
      matches_played: 33
    },
    {
      user_id: "5",
      username: "Lisa Anderson",
      profile_picture_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      total_points: 8200,
      matches_played: 31
    }
  ];

  // Sort by total_points and add rank
  const rankedData = rawData
    .sort((a, b) => b.total_points - a.total_points)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

  return rankedData;
};

export const getCurrentUserId = () => "2"; // Simulated current user ID