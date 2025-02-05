export interface Player {
    id: number;
    name: string;
    runs?: number;
    balls?: number;
    fours?: number;
    sixes?: number;
    strikeRate?: number;
    isStriker?: boolean;
  }
  
  export interface BowlingStats {
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
  }
  
  export interface Bowler extends Player {
    bowlingStats: BowlingStats;
  }
  
  export interface Ball {
    runs: number;
    isWicket: boolean;
    isExtra: boolean;
    extraType?: 'wide' | 'noBall' | 'bye' | 'legBye';
    timestamp: string;
  }
  
  export interface CricketMatch {
    id: string;
    team1: {
      name: string;
      score: number;
      wickets: number;
      overs: number;
    };
    team2: {
      name: string;
      score: number;
      wickets: number;
      overs: number;
    };
    currentInnings: 1 | 2;
    battingTeam: string;
    bowlingTeam: string;
    currentBatsmen: Player[];
    currentBowler: Bowler;
    recentBalls: Ball[];
    target?: number;
    requiredRunRate?: number;
    venue: string;
    matchType: 'T20' | 'ODI' | 'Test';
    status: 'live' | 'completed' | 'upcoming';
  }