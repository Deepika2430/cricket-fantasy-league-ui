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

export interface BallData {
  ball_number: number;
  batsman: string;
  batting_team: string;
  bowler: string;
  bowling_team: string;
  comment: string;
  event: string;
  over_number: number;
  runs: number;
}

export interface ScoreData {
  ball_data: BallData;
  ball_number: number;
  score: number;
  wickets: number;
}

export interface PlayerStats {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  wickets: number;
  overs: number;
  maidens: number;
  catches: number;
  runouts: number;
  stumpings: number;
  economyRate: number;
  strikeRate: number;
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