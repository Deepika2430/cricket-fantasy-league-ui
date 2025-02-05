import type { CricketMatch } from '../types/cricket';

// Simulated API response
const sampleMatch: CricketMatch = {
  id: "1",
  team1: {
    name: "India",
    score: 245,
    wickets: 6,
    overs: 35.4
  },
  team2: {
    name: "Australia",
    score: 0,
    wickets: 0,
    overs: 0
  },
  currentInnings: 1,
  battingTeam: "India",
  bowlingTeam: "Australia",
  currentBatsmen: [
    {
      id: 1,
      name: "Virat Kohli",
      runs: 86,
      balls: 74,
      fours: 8,
      sixes: 2,
      strikeRate: 116.22,
      isStriker: true
    },
    {
      id: 2,
      name: "KL Rahul",
      runs: 45,
      balls: 38,
      fours: 4,
      sixes: 1,
      strikeRate: 118.42,
      isStriker: false
    }
  ],
  currentBowler: {
    id: 3,
    name: "Mitchell Starc",
    bowlingStats: {
      overs: 7.4,
      maidens: 1,
      runs: 48,
      wickets: 2,
      economy: 6.26
    }
  },
  recentBalls: [
    { runs: 4, isWicket: false, isExtra: false, timestamp: "15:45:23" },
    { runs: 1, isWicket: false, isExtra: false, timestamp: "15:44:58" },
    { runs: 1, isWicket: false, isExtra: true, extraType: 'wide', timestamp: "15:44:32" },
    { runs: 0, isWicket: false, isExtra: false, timestamp: "15:44:12" },
    { runs: 6, isWicket: false, isExtra: false, timestamp: "15:43:45" },
    { runs: 2, isWicket: false, isExtra: false, timestamp: "15:43:20" }
  ],
  venue: "Melbourne Cricket Ground",
  matchType: "ODI",
  status: "live"
};

export const getLiveScore = async (): Promise<CricketMatch> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleMatch);
    }, 1000);
  });
};