import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTeamPlayers } from "../services/matches";
import { Loader2, Crown, Shield, X, Check, Coins } from "lucide-react";
import { useTheme } from "./ui/theme-provider";
import type { Player } from "../types/match";
import { getUserDetailsById } from "../services/userService";
import Cookies from "js-cookie";
// import cricketGroundImg from '../data/pixelcut-export.png'

async function getValidImage(url: string, playerLogo: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url); // If valid, return original URL
    img.onerror = () => resolve(playerLogo); // If broken, return default logo
    img.src = url;
  });
}

const playerLogo =
  "https://www.my11circle.com/fantasy-sports/wp-content/uploads/2022/07/player-icon.png";

interface SelectedPlayer extends Player {
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  position?: number;
}

const PLAYER_POSITIONS = [
  { left: "50%", top: "85%" }, // Wicket Keeper
  { left: "20%", top: "60%" }, // Deep Square Leg
  { left: "80%", top: "60%" }, // Deep Point
  { left: "35%", top: "40%" }, // Mid Wicket
  { left: "65%", top: "40%" }, // Cover
  { left: "50%", top: "30%" }, // Mid On
  { left: "20%", top: "20%" }, // Long On
  { left: "80%", top: "20%" }, // Long Off
  { left: "35%", top: "15%" }, // Fine Leg
  { left: "65%", top: "15%" }, // Third Man
  { left: "50%", top: "10%" }, // Bowler
];

// Cricket ground image URLs for different themes
const GROUND_IMAGES = {
  light:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6KUsbnMREqEBkTrVHfENbH-6flbQSratnQ&s",
  dark: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBb_BCyCI3fLUgCIUgo-b6M70GsD8hwrmTpw&s",
  // dark: cricketGroundImg
};

const PlayerButton = ({ player, isSelected, onClick, theme }) => {
  return (
    <button
      onClick={onClick}
      disabled={isSelected}
      className={`w-full p-3 rounded-lg flex items-center justify-between transition-colors ${theme === "dark"
          ? isSelected
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-gray-700/50 hover:bg-gray-700"
          : isSelected
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-blue-50 hover:bg-blue-100"
        }`}
    >
      <div className="flex items-center space-x-3">
        <img src={player.Avatar} alt={player.Name} className="w-10 h-10 rounded-full object-cover" />
        <span className="font-medium">{player.Name}</span>
        <span
          className={`px-2 py-1 text-sm font-medium rounded-full flex items-center gap-1 ${theme === "dark"
              ? player.Role === "Batsman"
                ? "bg-blue-600 text-white"
                : player.Role === "Bowler"
                  ? "bg-green-600 text-white"
                  : player.Role === "Wicketkeeper"
                    ? "bg-yellow-600 text-gray-900"
                    : player.Role === "Allrounder"
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-white"
              : player.Role === "Batsman"
                ? "bg-blue-200 text-blue-800"
                : player.Role === "Bowler"
                  ? "bg-green-200 text-green-800"
                  : player.Role === "Wicketkeeper"
                    ? "bg-yellow-200 text-yellow-800"
                    : player.Role === "Allrounder"
                      ? "bg-red-200 text-red-800"
                    : "bg-gray-200 text-gray-800"
            }`}
        >
          {player.Role}
        </span>
        <span
          className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 border shadow-sm transition-all duration-200 ${theme === "dark"
              ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white border-gray-600"
              : "bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 border-yellow-500"
            }`}
        >
          <Coins className="w-4 h-4 text-yellow-500 animate-none" />
          {player?.Cost || 100}
        </span>
      </div>
      {isSelected ? <Check className="w-5 h-5 text-green-500" /> : <div className={`w-5 h-5 rounded-full border-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`} />}
    </button>
  );
};

const TeamSelection = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const match = location.state?.match;

  const [team1Players, setTeam1Players] = useState<Player[]>([]);
  const [team2Players, setTeam2Players] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [selectedPlayerForRole, setSelectedPlayerForRole] =
    useState<SelectedPlayer | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [hoveredPlayer, setHoveredPlayer] = useState<SelectedPlayer | null>(
    null
  );
  const [groundImageError, setGroundImageError] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userTotalAmount, setUserTotalAmount] = useState<number>(0);
  const [loadingUserDetails, setLoadingUserDetails] = useState(true); // New state for loading user details

  const fetchUserDetails = async () => {
    setLoadingUserDetails(true); // Set loading state
    try {
      const userData = await getUserDetailsById(Cookies.get("userId"));
      userData.data.ProfilePictureURL = await getValidImage(
        userData.data.ProfilePictureURL,
        playerLogo
      );
      setUserDetails(userData?.data);

      // Calculate the total cost of selected players
      const totalCost = selectedPlayers.reduce((total, player) => {
        return total + (player.Cost || 100); // Assuming default cost is 100 if not specified
      }, 0);

      // Update user total amount based on fetched data and selected players' cost
      setUserTotalAmount(userData?.data.TotalPoints - totalCost);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoadingUserDetails(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Initial fetch
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        let [team1Data, team2Data] = await Promise.all([
          getTeamPlayers(match.team1.team_id),
          getTeamPlayers(match.team2.team_id),
        ]);
        setTeam1Players(Object.values(team1Data?.team?.players));
        setTeam2Players(Object.values(team2Data?.team?.players));
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setLoading(false);
      }
    };

    if (match) {
      fetchPlayers();
    }
  }, [match]);

  const updateUserTotalAmount = () => {
    const totalCost = selectedPlayers.reduce((total, player) => {
      return total + (player.Cost || 100);
    }, 0);
    setUserTotalAmount(userDetails?.TotalPoints - totalCost);
    console.log(`Total cost of selected players: ${totalCost}, User Total Amount: ${userTotalAmount}`);
  };

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayers.length >= 11) {
      console.log("Maximum players selected. Cannot add more.");
      return;
    }
    if (selectedPlayers.find((p) => p.PlayerID === player.PlayerID)) {
      console.log(`Player ${player.Name} is already selected.`);
      return;
    }

    const newTotalAmount = userTotalAmount - (player.Cost || 100);

    // Check if the new total amount would be less than zero
    if (newTotalAmount < 0) {
      alert("Insufficient points to select this player."); // Show alert for insufficient points
      return; // Exit the function if not enough points
    }

    // Update selected players
    const updatedSelectedPlayers = [
      ...selectedPlayers,
      { ...player, position: selectedPlayers.length },
    ];
    setSelectedPlayers(updatedSelectedPlayers); // Update the selected players state

    // Update user total amount
    setUserTotalAmount(newTotalAmount); // Update the total amount immediately
    console.log(`Player ${player.Name} added. Total players: ${updatedSelectedPlayers.length}`);
  };

  const handleGroundPlayerClick = (player: SelectedPlayer) => {
    setSelectedPlayerForRole(player);
    setShowRoleDialog(true);
  };

  const handleRoleSelection = (
    role: "captain" | "viceCaptain" | "remove" | "removeRole"
  ) => {
    if (!selectedPlayerForRole) return;

    let updatedPlayers = [...selectedPlayers];
    const playerIndex = updatedPlayers.findIndex(
      (p) => p.PlayerID === selectedPlayerForRole.PlayerID
    );

    if (role === "remove") {
      const playerCost = selectedPlayerForRole.Cost || 100; // Get the cost of the player being removed
      updatedPlayers = updatedPlayers.filter(
        (p) => p.PlayerID !== selectedPlayerForRole.PlayerID
      );
      // Update user total amount when a player is removed
      setUserTotalAmount((prevAmount) => prevAmount + playerCost); // Increase user coins
      console.log(`Player ${selectedPlayerForRole.Name} removed. Total players: ${updatedPlayers.length}`);
    } else if (role === "removeRole") {
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        isCaptain: false,
        isViceCaptain: false,
      };
      console.log(`Role removed from player ${selectedPlayerForRole.Name}.`);
    } else {
      updatedPlayers = updatedPlayers.map((p) => ({
        ...p,
        [role === "captain" ? "isCaptain" : "isViceCaptain"]: false,
      }));
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        [role === "captain" ? "isCaptain" : "isViceCaptain"]: true,
      };
      console.log(`Player ${selectedPlayerForRole.Name} assigned as ${role}.`);
    }

    setSelectedPlayers(updatedPlayers);
    setShowRoleDialog(false);
    setSelectedPlayerForRole(null);
  };

  const handleExit = () => {
    if (selectedPlayers.length > 0) {
      setShowExitConfirmation(true);
    } else {
      navigate("/matches");
    }
  };

  const confirmExit = () => {
    navigate("/matches");
  };

  const canSubmit =
    selectedPlayers.length === 11 &&
    selectedPlayers.some((p) => p.isCaptain) &&
    selectedPlayers.some((p) => p.isViceCaptain);

  const handleSubmit = () => {
    if (!canSubmit) return;
    console.log("Team submitted:", selectedPlayers);
  };

  if (loading || loadingUserDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div
      className={`right-0 min-h-screen p-4 md:p-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
    >
      {/* Fixed container for profile picture and user amount */}
      <div className={`fixed top-16 right-0 left-[16rem] w-[calc(100%-16rem)] z-30 ${theme === "dark" ? "bg-gray-900" : "bg-white"} p-2 shadow-md flex items-center justify-between`}>
        {/* Profile Picture */}
        <img
          src={userDetails.ProfilePictureURL || playerLogo}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
        />

        {/* Coins */}
        <div className="flex items-center text-lg font-bold p-4">
          <Coins className="w-6 h-6 text-yellow-500 mr-2" />
          <span className={`text-black ${theme === "dark" ? "text-white" : "text-black"}`}>{userTotalAmount}</span>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create Your Dream Team</h1>
          <button
            onClick={handleExit}
            className={`p-2 rounded-full transition-colors ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Cricket Ground */}
        <div className="mb-8">
          {!groundImageError ? (
            <div
              className="rounded-xl shadow-lg p-8 aspect-[2/1] relative bg-cover bg-center"
              style={{
                backgroundImage: `url(${GROUND_IMAGES[theme === "dark" ? "dark" : "light"]})`,
              }}
              onError={() => setGroundImageError(true)}
            >
              {/* Overlay for better visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>

              {/* Render selected players */}
              <div className="relative h-full">
                {selectedPlayers.map((player, index) => (
                  <div
                    key={player.PlayerID}
                    className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                      left: PLAYER_POSITIONS[index]?.left || "50%",
                      top: PLAYER_POSITIONS[index]?.top || "50%",
                    }}
                    onMouseEnter={() => setHoveredPlayer(player)}
                    onMouseLeave={() => setHoveredPlayer(null)}
                  >
                    <button
                      onClick={() => handleGroundPlayerClick(player)}
                      className="relative w-full h-full group"
                    >
                      <img
                        src={player.Avatar}
                        alt={player.Name}
                        className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-lg group-hover:border-blue-400 transition-colors"
                      />
                      {player.isCaptain && (
                        <Crown className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 drop-shadow-lg" />
                      )}
                      {player.isViceCaptain && (
                        <Shield className="absolute -top-2 -right-2 w-6 h-6 text-blue-400 drop-shadow-lg" />
                      )}
                      {hoveredPlayer === player && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10">
                          {player.Name}
                        </div>
                      )}
                      {/* Display player cost at the bottom of the card */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center bg-white text-black text-xs font-semibold rounded px-1">
                        <Coins className="w-4 h-4 text-yellow-500 mr-1" /> {/* Yellow coins */}
                        <span>{player.Cost || 100}</span> {/* Display player cost */}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}
        </div>
        {/* Teams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team 1 Players */}
          <div className={`rounded-xl shadow-lg p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-semibold mb-4">{match.team1.team_name}</h2>
            <div className="space-y-2">
              {team1Players.map((player) => {
                const isSelected = selectedPlayers.some((p) => p.PlayerID === player.PlayerID);
                return (
                  <PlayerButton
                    key={player.PlayerID}
                    player={player}
                    isSelected={isSelected}
                    onClick={() => handlePlayerSelect(player)}
                    theme={theme}
                  />
                );
              })}
            </div>
          </div>

          {/* Team 2 Players */}
          <div className={`rounded-xl shadow-lg p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-semibold mb-4">{match.team2.team_name}</h2>
            <div className="space-y-2">
              {team2Players.map((player) => {
                const isSelected = selectedPlayers.some((p) => p.PlayerID === player.PlayerID);
                return (
                  <PlayerButton
                    key={player.PlayerID}
                    player={player}
                    isSelected={isSelected}
                    onClick={() => handlePlayerSelect(player)}
                    theme={theme}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${canSubmit
              ? theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
              : theme === "dark"
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Submit Team
          </button>
        </div>
      </div>

      {/* Role Selection Dialog */}
      {showRoleDialog && selectedPlayerForRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg max-w-md w-full p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Player Actions</h3>
              <button onClick={() => setShowRoleDialog(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {!selectedPlayerForRole.isCaptain && (
                <button
                  onClick={() => handleRoleSelection("captain")}
                  className={`w-full p-3 rounded-lg flex items-center space-x-2 ${theme === "dark" ? "bg-yellow-900/50 hover:bg-yellow-900/70" : "bg-yellow-50 hover:bg-yellow-100"}`}
                >
                  <Crown className="w-5 h-5 text-yellow-600" />
                  <span>Make Captain</span>
                </button>
              )}

              {!selectedPlayerForRole.isViceCaptain && (
                <button
                  onClick={() => handleRoleSelection("viceCaptain")}
                  className={`w-full p-3 rounded-lg flex items-center space-x-2 ${theme === "dark" ? "bg-blue-900/50 hover:bg-blue-900/70" : "bg-blue-50 hover:bg-blue-100"}`}
                >
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Make Vice Captain</span>
                </button>
              )}

              {(selectedPlayerForRole.isCaptain || selectedPlayerForRole.isViceCaptain) && (
                <button
                  onClick={() => handleRoleSelection("removeRole")}
                  className={`w-full p-3 rounded-lg flex items-center space-x-2 ${theme === "dark" ? "bg-orange-900/50 hover:bg-orange-900/70" : "bg-orange-50 hover:bg-orange-100"}`}
                >
                  <X className="w-5 h-5 text-orange-600" />
                  <span>Remove Role</span>
                </button>
              )}

              <button
                onClick={() => handleRoleSelection("remove")}
                className={`w-full p-3 rounded-lg flex items-center space-x-2 ${theme === "dark" ? "bg-red-900/50 hover:bg-red-900/70" : "bg-red-50 hover:bg-red-100"}`}
              >
                <X className="w-5 h-5 text-red-600" />
                <span>Remove Player</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg max-w-md w-full p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <h3 className="text-xl font-semibold mb-4">Confirm Exit</h3>
            <p className={theme === "dark" ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
              Are you sure you want to exit? Your team selection will be lost.
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowExitConfirmation(false)} className={`px-4 py-2 rounded-lg ${theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`}>
                Cancel
              </button>
              <button onClick={confirmExit} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSelection;
