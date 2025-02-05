import { useEffect, useState } from 'react';
import { getLiveScore } from '../services/cricket';
import type { CricketMatch } from '../types/cricket';
import { Loader2, Circle, AlertCircle } from 'lucide-react';

const CricketLiveScore = () => {
  const [match, setMatch] = useState<CricketMatch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const data = await getLiveScore();
        setMatch(data);
      } catch (error) {
        console.error('Failed to fetch live score:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
    // Update score every 30 seconds
    const interval = setInterval(fetchScore, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-[100%]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle className="w-6 h-6" />
          <span>Failed to load match data</span>
        </div>
      </div>
    );
  }

  const getBallColor = (ball: typeof match.recentBalls[0]) => {
    if (ball.isWicket) return 'bg-red-500';
    if (ball.isExtra) return 'bg-yellow-500';
    if (ball.runs === 4 || ball.runs === 6) return 'bg-green-500';
    if (ball.runs === 0) return 'bg-gray-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{match.team1.name} vs {match.team2.name}</h1>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4 fill-red-500 animate-pulse" />
              <span className="text-sm font-medium">LIVE</span>
            </div>
          </div>
          <p className="text-blue-100 mt-1">{match.venue} • {match.matchType}</p>
        </div>

        {/* Score Summary */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="font-semibold text-lg">{match.team1.name}</h2>
              <p className="text-3xl font-bold text-gray-900">
                {match.team1.score}/{match.team1.wickets}
                <span className="text-lg text-gray-600 ml-2">
                  ({match.team1.overs} ov)
                </span>
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-lg">{match.team2.name}</h2>
              <p className="text-3xl font-bold text-gray-900">
                {match.team2.score}/{match.team2.wickets}
                <span className="text-lg text-gray-600 ml-2">
                  ({match.team2.overs} ov)
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Current Batsmen */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Batting</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="text-left pb-2">Batsman</th>
                  <th className="text-right pb-2">R</th>
                  <th className="text-right pb-2">B</th>
                  <th className="text-right pb-2">4s</th>
                  <th className="text-right pb-2">6s</th>
                  <th className="text-right pb-2">SR</th>
                </tr>
              </thead>
              <tbody>
                {match.currentBatsmen.map((batsman) => (
                  <tr key={batsman.id} className="text-gray-900">
                    <td className="py-2">
                      {batsman.name}
                      {batsman.isStriker && <span className="ml-2">*</span>}
                    </td>
                    <td className="text-right">{batsman.runs}</td>
                    <td className="text-right">{batsman.balls}</td>
                    <td className="text-right">{batsman.fours}</td>
                    <td className="text-right">{batsman.sixes}</td>
                    <td className="text-right">{batsman.strikeRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Bowler */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Bowling</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="text-left pb-2">Bowler</th>
                  <th className="text-right pb-2">O</th>
                  <th className="text-right pb-2">M</th>
                  <th className="text-right pb-2">R</th>
                  <th className="text-right pb-2">W</th>
                  <th className="text-right pb-2">Econ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-900">
                  <td className="py-2">{match.currentBowler.name}</td>
                  <td className="text-right">{match.currentBowler.bowlingStats.overs}</td>
                  <td className="text-right">{match.currentBowler.bowlingStats.maidens}</td>
                  <td className="text-right">{match.currentBowler.bowlingStats.runs}</td>
                  <td className="text-right">{match.currentBowler.bowlingStats.wickets}</td>
                  <td className="text-right">{match.currentBowler.bowlingStats.economy}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Balls */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Balls</h3>
          <div className="flex space-x-2">
            {match.recentBalls.map((ball, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full ${getBallColor(ball)} text-white flex items-center justify-center font-semibold`}
                title={`${ball.runs} runs at ${ball.timestamp}`}
              >
                {ball.isWicket ? 'W' : ball.runs}
              </div>
            )).reverse()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CricketLiveScore;