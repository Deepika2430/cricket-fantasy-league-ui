export interface Player {
  id: number;
  name: string;
  avatar?: string;
}

export interface Team {
  team_id: number;
  name: string;
  country: string;
  logo: string;
  players?: Player[];
}

export interface Match {
  match_id: number;
  team1: Team;
  team2: Team;
  match_date: string;
  venue: string;
  status: 'live' | 'upcoming';
  result_details?: string;
}