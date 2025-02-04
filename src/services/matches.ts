const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

const samplePlayers = [
  { id: 1, name: "Marcus Rashford", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" },
  { id: 2, name: "Bruno Fernandes", avatar: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=400&h=400&fit=crop" },
  { id: 3, name: "Mason Mount", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop" },
  { id: 4, name: "Rasmus Højlund", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
  { id: 5, name: "Casemiro", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop" },
];

const sampleMatchesData = [
  {
    match_id: 1,
    team1: {
      team_id: 1,
      name: "Manchester United",
      country: "England",
      logo: "http://i.pinimg.com/736x/54/96/c3/5496c328d02c848b352190a0eee94dc1.jpg",
    },
    team2: {
      team_id: 2,
      name: "Real Madrid",
      country: "Spain",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAh10-dv4WH364j31mCsSYIApfcbONlaycHQ&s",
    },
    match_date: "2025-02-04T20:00:00Z",
    venue: "Santiago Bernabéu, Madrid",
    status: "live",
    result_details: "3-1",
  },
  {
    match_id: 2,
    team1: {
      team_id: 3,
      name: "Bayern Munich",
      country: "Germany",
      logo: "https://media.istockphoto.com/id/1487667014/vector/emblem-patch-cricket-sport-club-logo-template.jpg?s=612x612&w=0&k=20&c=J-KlCJzm0-NOYAzuYyjM4yCPc9Dfn-Y1QiFQ1AAQQm0=",
    },
    team2: {
      team_id: 4,
      name: "Barcelona",
      country: "Spain",
      logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    },
    match_date: "2025-02-05T18:00:00Z",
    venue: "Allianz Arena, Munich",
    status: "upcoming",
  },
  {
    match_id: 3,
    team1: {
      team_id: 5,
      name: "Juventus",
      country: "Italy",
      logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/Juventus_FC_2017_logo.svg",
    },
    team2: {
      team_id: 6,
      name: "Paris Saint-Germain",
      country: "France",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
    },
    match_date: "2025-02-06T21:00:00Z",
    venue: "Parc des Princes, Paris",
    status: "upcoming",
  },
  {
    match_id: 4,
    team1: {
      team_id: 7,
      name: "Liverpool",
      country: "England",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    },
    team2: {
      team_id: 8,
      name: "Chelsea",
      country: "England",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    },
    match_date: "2025-02-07T19:00:00Z",
    venue: "Anfield, Liverpool",
    status: "upcoming",
  },
  {
    match_id: 5,
    team1: {
      team_id: 9,
      name: "Arsenal",
      country: "England",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    },
    team2: {
      team_id: 10,
      name: "Tottenham Hotspur",
      country: "England",
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
    },
    match_date: "2025-02-08T17:00:00Z",
    venue: "Emirates Stadium, London",
    status: "upcoming",
  },
];

export async function getMatches(): Promise<Match[]> {
  // Simulating API call with sample data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleMatchesData);
    }, 1000);
  });
}

export async function getTeamPlayers(teamId: number): Promise<Player[]> {
  // Simulating API call with sample data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomize the number of players (3-5) and shuffle their order
      const numPlayers = Math.floor(Math.random() * 3) + 3;
      const shuffledPlayers = [...samplePlayers]
        .sort(() => Math.random() - 0.5)
        .slice(0, numPlayers);
      resolve(shuffledPlayers);
    }, 800);
  });
}

// const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

// export async function getMatches(): Promise<Match[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/matches`);
//     if (!response.ok) throw new Error('Failed to fetch matches');
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching matches:', error);
//     throw error;
//   }
// }

// export async function getTeamPlayers(teamId: number): Promise<Player[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/teams/${teamId}/players`);
//     if (!response.ok) throw new Error('Failed to fetch team players');
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching team players:', error);
//     throw error;
//   }
// }