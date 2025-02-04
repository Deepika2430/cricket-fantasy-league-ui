import { useEffect, useState } from "react";
import { useTheme } from "./ui/theme-provider";
import { motion } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { MapPin, User as UserIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

const matchesData = [
  {
    match_id: 3,
    team1: {
      team_id: 3,
      name: "Manchester United",
      country: "England",
      logo: "http://i.pinimg.com/736x/54/96/c3/5496c328d02c848b352190a0eee94dc1.jpg",
      players: ["Player 1", "Player 2", "Player 3"],
    },
    team2: {
      team_id: 2,
      name: "Real Madrid",
      country: "Spain",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAh10-dv4WH364j31mCsSYIApfcbONlaycHQ&s",
      players: ["Player A", "Player B", "Player C"],
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
      name: "Manchester United",
      country: "England",
      players: ["Player 1", "Player 2", "Player 3"],
      logo: "http://i.pinimg.com/736x/54/96/c3/5496c328d02c848b352190a0eee94dc1.jpg",
    },
    team2: {
      team_id: 2,
      name: "Real Madrid",
      country: "Spain",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAh10-dv4WH364j31mCsSYIApfcbONlaycHQ&s",
      players: ["Player 1", "Player 2", "Player 3"],
    },
    match_date: "2025-02-04T20:00:00Z",
    venue: "Santiago Bernabéu, Madrid",
    status: "live",
    result_details: "3-1",
  },
  {
    match_id: 4,
    team1: {
      team_id: 1,
      name: "Bayern Munich",
      country: "Germany",
      players: ["Player 1", "Player 2", "Player 3"],
      logo: "https://media.istockphoto.com/id/1487667014/vector/emblem-patch-cricket-sport-club-logo-template.jpg?s=612x612&w=0&k=20&c=J-KlCJzm0-NOYAzuYyjM4yCPc9Dfn-Y1QiFQ1AAQQm0=",
    },
    team2: {
      team_id: 2,
      name: "Real Madrid",
      country: "Spain",
      players: ["Player 1", "Player 2", "Player 3"],
      logo: "https://i1.wp.com/assets.stickpng.com/images/6283d2b43ae447642fcf4055.png?strip=all",
    },
    match_date: "2025-02-04T15:00:00Z",
    venue: "Old Trafford, Manchester",
    status: "upcoming",
  },
  {
    match_id: 5,
    team1: {
      team_id: 1,
      name: "Bayern Munich",
      country: "Germany",
      players: ["Player 1", "Player 2", "Player 3"],
      logo: "https://media.istockphoto.com/id/1487667014/vector/emblem-patch-cricket-sport-club-logo-template.jpg?s=612x612&w=0&k=20&c=J-KlCJzm0-NOYAzuYyjM4yCPc9Dfn-Y1QiFQ1AAQQm0=",
    },
    team2: {
      team_id: 2,
      name: "Real Madrid",
      country: "Spain",
      players: ["Player 1", "Player 2", "Player 3"],
      logo: "https://i1.wp.com/assets.stickpng.com/images/6283d2b43ae447642fcf4055.png?strip=all",
    },
    match_date: "2025-02-05T15:00:00Z",
    venue: "Old Trafford, Manchester",
    status: "upcoming",
  },
  {
    match_id: 5,
    team1: {
      team_id: 1,
      name: "Bayern Munich",
      players: ["Player 1", "Player 2", "Player 3"],
      country: "Germany",
      logo: "https://media.istockphoto.com/id/1487667014/vector/emblem-patch-cricket-sport-club-logo-template.jpg?s=612x612&w=0&k=20&c=J-KlCJzm0-NOYAzuYyjM4yCPc9Dfn-Y1QiFQ1AAQQm0=",
    },
    team2: {
      team_id: 2,
      name: "Real Madrid",
      players: ["Player 1", "Player 2", "Player 3"],
      country: "Spain",
      logo: "https://i1.wp.com/assets.stickpng.com/images/6283d2b43ae447642fcf4055.png?strip=all",
    },
    match_date: "2025-02-05T15:00:00Z",
    venue: "Old Trafford, Manchester",
    status: "upcoming",
  },
  {
    match_id: 5,
    team1: {
      team_id: 1,
      name: "Bayern Munich",
      country: "Germany",
      players: ["Player 1", "Player 2", "Player 3"],
      logo: "https://media.istockphoto.com/id/1487667014/vector/emblem-patch-cricket-sport-club-logo-template.jpg?s=612x612&w=0&k=20&c=J-KlCJzm0-NOYAzuYyjM4yCPc9Dfn-Y1QiFQ1AAQQm0=",
    },
    team2: {
      team_id: 2,
      name: "Real Madrid",
      players: ["Player 1", "Player 2", "Player 3"],
      country: "Spain",
      logo: "https://i1.wp.com/assets.stickpng.com/images/6283d2b43ae447642fcf4055.png?strip=all",
    },
    match_date: "2025-02-05T15:00:00Z",
    venue: "Old Trafford, Manchester",
    status: "upcoming",
  },
];

const Matches = () => {
  const [matches, setMatches] = useState(matchesData);
  const [countdowns, setCountdowns] = useState<{ [key: number]: string }>({});
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { theme } = useTheme();
  const { state } = useSidebar();

  useEffect(() => {
    const sortedMatches = [...matchesData].sort((a, b) => {
      if (a.status === "live" && b.status !== "live") return -1;
      if (a.status !== "live" && b.status === "live") return 1;
      return (
        new Date(a.match_date).getTime() - new Date(b.match_date).getTime()
      );
    });
    setMatches(sortedMatches);

    const interval = setInterval(() => {
      const newCountdowns: { [key: number]: string } = {};
      sortedMatches.forEach((match) => {
        if (
          match.status === "upcoming" &&
          new Date(match.match_date).toDateString() ===
            new Date().toDateString()
        ) {
          newCountdowns[match.match_id] = getCountdown(match.match_date);
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCountdown = (matchDate: string) => {
    const now = new Date();
    const matchTime = new Date(matchDate).getTime();
    const timeLeft = matchTime - now.getTime();

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  interface Team {
    team_id: number;
    name: string;
    country: string;
    logo: string;
    players?: string[];
  }

  interface Match {
    match_id: number;
    team1: Team;
    team2: Team;
    match_date: string;
    venue: string;
    status: string;
    result_details?: string;
  }

  const handleCardClick = (match: Match) => {
    setSelectedMatch(match);
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">
        Live & Upcoming Matches
      </h2>
      <div
        className={`grid gap-8 ${
          state === "collapsed"
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {matches.map((match) => (
          <motion.div
            key={match.match_id}
            className={`relative w-full p-8 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md transition-transform transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <div onClick={() => handleCardClick(match)}>
                  {/* Venue */}
                  <p
                    className={`absolute top-2 left-2 text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    <MapPin className="inline-block mr-1" /> Venue:{" "}
                    <span className="font-bold">{match.venue}</span>
                  </p>

                  {/* Live Match Indicator */}
                  {match.status === "live" && (
                    <div className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded-full animate-pulse">
                      Live 🔴
                    </div>
                  )}

                  {/* Team Logos */}
                  <div className="flex items-center justify-between mb-4 mt-8">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <img
                          src={match.team1.logo}
                          alt={match.team1.name}
                          className="w-16 h-16 rounded-full"
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className={`${
                          theme === "dark"
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {match.team1.name}
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-2xl font-bold">VS</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <img
                          src={match.team2.logo}
                          alt={match.team2.name}
                          className="w-16 h-16 rounded-full"
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className={`${
                          theme === "dark"
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {match.team2.name}
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Match Details */}
                  <p
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    📅 {match.status === "live" ? "Started at" : "Date"}:{" "}
                    <span className="font-bold">
                      {match.status === "live"
                        ? new Date(match.match_date).toLocaleTimeString()
                        : new Date(match.match_date).toLocaleString()}
                    </span>
                  </p>

                  {/* Custom Content for Live Matches */}
                  {match.status === "live" && (
                    <div className="mt-4">
                      {/* Add your custom content here */}
                    </div>
                  )}

                  {/* Result & Countdown */}
                  {match.result_details && (
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      {/* 🏆 Result */}
                      {/* Add a tooltip to show the full result details */}
                      {/* <span className="font-bold">{match.result_details}</span> */}
                    </p>
                  )}
                  {match.status === "upcoming" &&
                    new Date(match.match_date).toDateString() ===
                      new Date().toDateString() && (
                      <p className="text-red-500 font-bold text-lg text-center mt-4">
                        ⏳ Countdown: {countdowns[match.match_id]}
                      </p>
                    )}
                </div>
              </DialogTrigger>
              <DialogContent className={`max-w-4xl ${
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
  }`}>
                <DialogHeader>
                  <DialogTitle>Match Details</DialogTitle>
                  <DialogDescription>
                    Players for {match.team1.name} and {match.team2.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                  <div className="w-1/2 pr-4">
                    <h4 className="text-xl font-semibold mb-2">
                      {match.team1.name}
                    </h4>
                    <ul className="list-disc list-inside">
                      {match.team1.players?.map((player, index) => (
                        <li key={index} className="flex items-center">
                          <UserIcon className="w-6 h-6 rounded-full mr-2" />
                          {player}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/2 pl-4">
                    <h4 className="text-xl font-semibold mb-2">
                      {match.team2.name}
                    </h4>
                    <ul className="list-disc list-inside">
                      {match.team2.players?.map((player, index) => (
                        <li key={index} className="flex items-center">
                          <UserIcon className="w-6 h-6 rounded-full mr-2" />
                          {player}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Create Team
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
