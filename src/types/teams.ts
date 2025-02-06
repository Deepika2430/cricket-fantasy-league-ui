export interface Player {
    id: number;
    name: string;
    role: string;
    TeamID?: number;
    APIPlayerID?: string;
    avatar?: string;
  }
  
  export interface Team {
    api_team_id: string;
    country: string;
    name: string;
    players: Player[];
    team_id: number;
  }
  