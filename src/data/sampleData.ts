import { Player, Match, LeaderboardEntry } from '../types';

export const samplePlayers: Player[] = [
  {
    id: '1',
    name: 'Virat Kohli',
    role: 'Batsman',
    team: 'RCB',
    price: 12,
    points: 150,
    stats: {
      matches: 200,
      runs: 6500,
      wickets: 0,
      catches: 80
    }
  },
  {
    id: '2',
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    team: 'MI',
    price: 11,
    points: 140,
    stats: {
      matches: 120,
      runs: 50,
      wickets: 130,
      catches: 15
    }
  },
  {
    id: '3',
    name: 'MS Dhoni',
    role: 'Wicket-Keeper',
    team: 'CSK',
    price: 10,
    points: 135,
    stats: {
      matches: 250,
      runs: 4500,
      wickets: 0,
      catches: 150,
      stumpings: 100
    }
  },
  {
    id: '4',
    name: 'Hardik Pandya',
    role: 'All-Rounder',
    team: 'MI',
    price: 9.5,
    points: 125,
    stats: {
      matches: 100,
      runs: 1500,
      wickets: 60,
      catches: 45
    }
  },
  {
    id: '5',
    name: 'Rohit Sharma',
    role: 'Batsman',
    team: 'MI',
    price: 11,
    points: 145,
    stats: {
      matches: 220,
      runs: 5800,
      wickets: 0,
      catches: 90
    }
  },
  {
    id: '6',
    name: 'Ravindra Jadeja',
    role: 'All-Rounder',
    team: 'CSK',
    price: 9,
    points: 130,
    stats: {
      matches: 180,
      runs: 2000,
      wickets: 120,
      catches: 80
    }
  }
];

export const sampleMatches: Match[] = [
  {
    id: '1',
    team1: 'MI',
    team2: 'CSK',
    date: '2024-03-25',
    venue: 'Wankhede Stadium',
    status: 'Live',
    time: '19:30',
    score: {
      team1: {
        runs: 156,
        wickets: 4,
        overs: 16.2
      },
      currentBatsmen: {
        striker: 'Rohit Sharma',
        nonStriker: 'Hardik Pandya',
        strikerRuns: 72,
        strikerBalls: 45,
        nonStrikerRuns: 28,
        nonStrikerBalls: 20
      },
      currentBowler: {
        name: 'Ravindra Jadeja',
        overs: 3.2,
        maidens: 0,
        runs: 28,
        wickets: 2
      },
      recentBalls: ['1', '4', 'W', '0', '6', '2']
    }
  },
  {
    id: '2',
    team1: 'RCB',
    team2: 'KKR',
    date: '2024-03-26',
    venue: 'M. Chinnaswamy Stadium',
    status: 'Upcoming',
    time: '19:30'
  },
  {
    id: '3',
    team1: 'DC',
    team2: 'PBKS',
    date: '2024-03-27',
    venue: 'Arun Jaitley Stadium',
    status: 'Completed',
    time: '19:30',
    score: {
      team1: {
        runs: 189,
        wickets: 10,
        overs: 19.4
      },
      team2: {
        runs: 192,
        wickets: 6,
        overs: 19.2
      }
    }
  }
];

export const sampleLeaderboard: LeaderboardEntry[] = [
  { rank: 1, teamName: 'Super Stars', ownerName: 'John Doe', points: 850 },
  { rank: 2, teamName: 'Cricket Kings', ownerName: 'Jane Smith', points: 820 },
  { rank: 3, teamName: 'Dream Team', ownerName: 'Mike Johnson', points: 780 },
  { rank: 4, teamName: 'Power Players', ownerName: 'Sarah Wilson', points: 750 },
  { rank: 5, teamName: 'Game Changers', ownerName: 'Tom Brown', points: 720 }
];