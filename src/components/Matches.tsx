import { useEffect, useState } from "react";
import { useTheme } from "./ui/theme-provider";
import { motion } from "framer-motion";
import { useSidebar } from "./ui/sidebar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getMatches, getTeamPlayers } from "../services/Matches";
import type { Match, Player } from "../types/match";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [countdowns, setCountdowns] = useState<Record<number, string>>({});
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [team1Players, setTeam1Players] = useState<Player[]>([]);
  const [team2Players, setTeam2Players] = useState<Player[]>([]);
  const { theme } = useTheme();
  const { state } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

const playerLogo = "https://www.my11circle.com/fantasy-sports/wp-content/uploads/2022/07/player-icon.png";

  useEffect(() => {
    fetchTeamPlayers();
  }, [selectedMatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns: Record<number, string> = {};
      matches.forEach((match) => {
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
  }, [matches]);

  const fetchMatches = async () => {
    try {
      const data = await getMatches();
      const sortedMatches = [...data].sort((a, b) => {
        if (a.status === "live" && b.status !== "live") return -1;
        if (a.status !== "live" && b.status === "live") return 1;
        return (
          new Date(a.match_date).getTime() - new Date(b.match_date).getTime()
        );
      });
      setMatches(sortedMatches);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamPlayers = async () => {
    if (selectedMatch) {
      setLoadingPlayers(true);
      try {
        const team1PlayersData = await getTeamPlayers(selectedMatch.team1.team_id);
        const team2PlayersData = await getTeamPlayers(selectedMatch.team2.team_id);
        const team1 = team1PlayersData?.team?.players;
        const team2 = team2PlayersData?.team?.players;
        setTeam1Players(Object.values(team1));
        setTeam2Players(Object.values(team2));
      } catch (error) {
        console.error("Failed to fetch team players:", error);
      } finally {
        setLoadingPlayers(false);
      }
    }
  };

  const getCountdown = (matchDate: string) => {
    const now = new Date();
    const matchTime = new Date(matchDate).getTime();
    const timeLeft = matchTime - now.getTime();

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  function teamCreation(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    if (selectedMatch) {
      navigate("/team", { state: { match: selectedMatch } });
    }
  }

  const handleCardClick = (match: Match) => setSelectedMatch(match);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

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
          <Dialog key={match.match_id}>
            <DialogTrigger asChild>
              <motion.div
                className={`relative w-full p-8 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md cursor-pointer ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCardClick(match)}
              >
                <div className="flex justify-between items-center">
                {match.status === "live" && (
  <div className="absolute top-2 right-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-md animate-none">
    ⚪ LIVE
  </div>
)}

                  <img
                    src={match?.team1?.logo}
                    alt={match.team1.team_name}
                    className="h-16 w-16 rounded-full object-contain"
                  />
                  <span className="text-xl font-semibold">VS</span>
                  <img
                    src={match.team2.logo}
                    alt={match.team2.team_name}
                    className="h-16 w-16 rounded-full object-contain"
                  />
                </div>
                <p className="text-center mt-2 font-semibold">
                  {match.team1.team_name} vs {match.team2.team_name}
                </p>
                <p
                  className={`text-center ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {match.venue}
                </p>
                <p className="text-center mt-2">
                  {match.status === "upcoming"
                    ? countdowns[match.match_id] || "Starting Soon"
                    : match.result_details}
                </p>
              </motion.div>
            </DialogTrigger>

            {selectedMatch && (
              <DialogContent
              className={`max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-none ${
                  theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl">
                    Match Details
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    {selectedMatch.venue} -{" "}
                    {new Date(selectedMatch.match_date).toLocaleString()}
                  </DialogDescription>
                </DialogHeader>

                {loadingPlayers ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : (
                  <div className="flex justify-between items-start p-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={selectedMatch.team1.logo}
                        alt={selectedMatch.team1.team_name}
                        className="h-20 w-20 rounded-full object-contain"
                      />
                      <p className="mt-2 text-lg font-semibold">
                        {selectedMatch.team1.team_name}
                      </p>
                      <div className="mt-4 space-y-3">
                        {team1Players?.map((player) => (
                          <div
                            key={player.PlayerID}
                            className="flex items-center space-x-2"
                          >
                            <Avatar>
                              <AvatarImage
                                src={player.Avatar || playerLogo}
                                alt={player.Name}
                              />
                              <AvatarFallback>{player.Name}</AvatarFallback>
                            </Avatar>
                            <p>{player.Name}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold mb-4">VS</span>
                      {selectedMatch.status === "live" && (
                        <div className="px-4 py-2 bg-red-500 text-white rounded-lg animate-pulse">
                          ⚪ LIVE
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center">
                      <img
                        src={selectedMatch.team2.logo}
                        alt={selectedMatch.team2.team_name}
                        className="h-20 w-20 rounded-full object-contain"
                      />
                      <p className="mt-2 text-lg font-semibold">
                        {selectedMatch.team2.team_name}
                      </p>
                      <div className="mt-4 space-y-3">
                        {team2Players?.map((player) => (
                          <div
                            key={player.PlayerID}
                            className="flex items-center space-x-2"
                          >
                            <Avatar>
                              <AvatarImage
                                src={player.Avatar || playerLogo}
                                alt={player.Name}
                              />
                              <AvatarFallback>{player.Name}</AvatarFallback>
                            </Avatar>
                            <p>{player.Name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}


                <DialogFooter>
                  {selectedMatch.status !== "live" && (
                    <Button
                      size="lg"
                      className={`w-full sm:w-auto ${
                        theme === "dark"
                          ? "bg-gray-800"
                          : "bg-white border-gray-600"
                      }`}
                      onClick={teamCreation}
                    >
                      Create Team
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Matches;
