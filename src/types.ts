export interface Player {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  team: string;
  price: number;
  points: number;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    catches: number;
    stumpings?: number;
  };
}

export interface UserTeam {
  id: string;
  name: string;
  players: Player[];
  totalPoints: number;
  budget: number;
  captain?: Player;
  viceCaptain?: Player;
}

export interface Match {
  id: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  venue: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  score?: {
    team1: {
      runs: number;
      wickets: number;
      overs: number;
    };
    team2?: {
      runs: number;
      wickets: number;
      overs: number;
    };
    currentBatsmen?: {
      striker: string;
      nonStriker: string;
      strikerRuns: number;
      strikerBalls: number;
      nonStrikerRuns: number;
      nonStrikerBalls: number;
    };
    currentBowler?: {
      name: string;
      overs: number;
      maidens: number;
      runs: number;
      wickets: number;
    };
    recentBalls?: string[];
  };
}