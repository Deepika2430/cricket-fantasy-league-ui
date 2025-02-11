import { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, Clock, Award, TrendingUp } from 'lucide-react';
import { ScoreData, PlayerStats } from '../types';
import { calculateBattingPoints, calculateBowlingPoints, calculateFieldingPoints } from '../utils/pointsCalculator';
import { getLiveScore } from '../services/LiveScore';
import { useTheme } from './ui/theme-provider';

// Mock data for testing
const mockApiResponse: ScoreData = {
  ball_data: {
    ball_number: 1,
    batsman: "Rohit Sharma",
    batting_team: "India",
    bowler: "Moeen Ali",
    bowling_team: "England",
    comment: "Pushing the score along.",
    event: "Three Runs",
    over_number: 1,
    runs: 3
  },
  ball_number: 1,
  score: 3,
  wickets: 0
};

const LiveScore = () => {
  const { theme } = useTheme();
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Use refs to track current values without causing re-renders
  const playerStatsRef = useRef<PlayerStats>({
    name: "Rohit Sharma",
    runs: 0,
    balls: 0,
    fours: 0,
    sixes: 0,
    wickets: 0,
    overs: 0,
    maidens: 0,
    catches: 0,
    runouts: 0,
    stumpings: 0,
    economyRate: 0,
    strikeRate: 0
  });

  const totalPointsRef = useRef(0);

  const calculatePoints = useCallback((stats: PlayerStats) => {
    console.log("Calculating points");
    const battingPoints = calculateBattingPoints(stats);
    const bowlingPoints = calculateBowlingPoints(stats);
    const fieldingPoints = calculateFieldingPoints(stats);
    return battingPoints + bowlingPoints + fieldingPoints;
  }, []);

  const updatePlayerStats = useCallback((data: ScoreData) => {
    const currentStats = playerStatsRef.current;
    console.log(data)
    if (data.ball_data.batsman === currentStats.name) {
      const newStats = { ...currentStats };
      newStats.runs += data.ball_data.runs;
      newStats.balls += 1;
      if (data.ball_data.event.includes('FOUR')) newStats.fours += 1;
      if (data.ball_data.event.includes('SIX')) newStats.sixes += 1;

      // Update the ref
      playerStatsRef.current = newStats;

      // Calculate new points
      const newTotalPoints = calculatePoints(newStats);
      const pointsDiff = newTotalPoints - totalPointsRef.current;

      // Update refs and state
      totalPointsRef.current = newTotalPoints;
      setTotalPoints(newTotalPoints);
      setLastPoints(pointsDiff);
    }
    console.log(totalPoints);
  }, [calculatePoints]);

  const fetchScore = useCallback(async () => {
    try {
      // For development, use mock data
      // In production, replace this with actual API call:
      const data = await getLiveScore();
      // const data = response?.data;
      console.log(data)
      // const data = mockApiResponse;
      setScoreData(data);
      setError(null);

      updatePlayerStats(data);
      console.log(lastPoints)
    } catch (error) {
      setError('Failed to fetch score data. Please try again later.');
      console.error('Error fetching score:', error);
    }
  }, [updatePlayerStats]);

  useEffect(() => {
    fetchScore(); // Initial fetch
    const interval = setInterval(fetchScore, 30000);
    return () => clearInterval(interval);
  }, [fetchScore]);

  if (error) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-r from-[#1A1F2C] to-[#2D3748] text-white' : 'bg-gradient-to-r from-[#F3F4F6] to-[#E5E7EB] text-black'} flex items-center justify-center`}>
        <div className="bg-red-500/20 p-4 rounded-lg text-red-300">
          {error}
        </div>
      </div>
    );
  }

  if (!scoreData) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-r from-[#1A1F2C] to-[#2D3748] text-white' : 'bg-gradient-to-r from-[#F3F4F6] to-[#E5E7EB] text-black'} flex items-center justify-center`}>
        <div className="animate-pulse text-xl">Loading match data...</div>
      </div>
    );
  }

  return (
    <div className={`w-full ${theme === 'dark' ? 'bg-gradient-to-r from-[#1A1F2C] to-[#2D3748] text-white' : 'bg-gradient-to-r from-[#F3F4F6] to-[#E5E7EB] text-black'} py-8`}>
      {/* Points Display */}
      <div className="container mx-auto px-4 mb-6">
        <div className={`${theme === 'dark' ? 'bg-black/30' : 'bg-white/30'} rounded-xl p-6 backdrop-blur-sm mb-6`}>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Award className="h-6 w-6 text-yellow-400" />
                <span className="text-lg font-medium">Total Points</span>
              </div>
              <p className="text-3xl font-bold text-yellow-400">{totalPoints}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-6 w-6 text-green-400" />
                <span className="text-lg font-medium">Last Update</span>
              </div>
              <p className="text-3xl font-bold text-green-400">+{lastPoints}</p>
            </div>
          </div>
        </div>

        {/* Match Score */}
        <div className={`${theme === 'dark' ? 'bg-black/20' : 'bg-white/20'} rounded-xl p-6 backdrop-blur-sm`}>
          <div className="flex justify-between items-center">
            {/* Team 1 */}
            <div className="text-center space-y-3 flex-1">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=150&h=150&fit=crop"
                  alt={scoreData.ball_data.batting_team}
                  className="h-20 w-20 mx-auto rounded-full border-4 border-white/10 hover:border-white/30 transition-all duration-300"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-xs px-2 py-0.5 rounded-full">
                  Batting
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{scoreData.ball_data.batting_team}</h3>
                <p className="text-3xl font-bold text-[#9b87f5]">{scoreData.score}/{scoreData.wickets}</p>
                <p className="text-sm text-gray-400">
                  Overs: {scoreData.ball_data.over_number}.{scoreData.ball_data.ball_number % scoreData.ball_data.over_number}
                </p>
              </div>
            </div>

            {/* Match Info */}
            <div className="text-center px-6 flex-1">
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="h-5 w-5 text-[#9b87f5]" />
                  <span className="font-medium">T20 World Cup</span>
                </div>
                <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full inline-flex items-center space-x-1">
                  <span className="animate-pulse">●</span>
                  <span className="text-sm font-medium">LIVE</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>{scoreData.ball_data.over_number}.{scoreData.ball_data.ball_number} Overs</span>
                </div>
              </div>
            </div>

            {/* Team 2 */}
            <div className="text-center space-y-3 flex-1">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=150&h=150&fit=crop"
                  alt={scoreData.ball_data.bowling_team}
                  className="h-20 w-20 mx-auto rounded-full border-4 border-white/10 hover:border-white/30 transition-all duration-300"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-xs px-2 py-0.5 rounded-full">
                  Bowling
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{scoreData.ball_data.bowling_team}</h3>
                <p className="text-3xl font-bold">Yet to bat</p>
              </div>
            </div>
          </div>

          {/* Last Ball Updates */}
          <div className={`mt-6 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-lg p-4`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm mb-1">
                  <span className="text-[#9b87f5] font-semibold">Last Ball:</span>
                  <span className="ml-2">{scoreData.ball_data.bowler} to {scoreData.ball_data.batsman}</span>
                </p>
                <p className="text-lg">{scoreData.ball_data.comment}</p>
              </div>
              <div className="text-2xl font-bold text-[#9b87f5]">
                {scoreData.ball_data.runs}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScore;