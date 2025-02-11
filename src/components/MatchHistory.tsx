import React, { useEffect } from 'react';
import avatarImage from '../data/cricket-player-ready-to-hit.png';
import { Coins, CalendarDays, MapPin, Trophy, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from './ui/lib/utils';
import { getUserDetailsById, getUserMatches } from '../services/UserService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from './ui/theme-provider';
import { Match } from '../types/match';

// MatchCard component
const MatchCard: React.FC<{ match: any }> = ({ match }) => {
  const {theme} = useTheme();
  const statusColors = {
    live: "text-red-500 bg-red-50 hover:bg-red-100",
    completed: "text-green-500 bg-green-50 hover:bg-green-100",
    upcoming: "text-blue-500 bg-blue-50 hover:bg-blue-100",
  };

  const statusIcons = {
    live: <Activity className="w-4 h-4" />,
    completed: <Trophy className="w-4 h-4" />,
    upcoming: <CalendarDays className="w-4 h-4" />,
  };

  return (
    <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700 hover:border-gray-600 border-t-4 border-t-primary" : "bg-white border-t-4 border-t-primary border-gray-300 hover:bg-gray-1 "} overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="secondary"
            className={cn(
              "flex items-center gap-1 px-2 py-1 font-medium",
              statusColors[match.status as keyof typeof statusColors]
            )}
          >
            {statusIcons[match.status as keyof typeof statusIcons]}
            {(match.status as string).charAt(0).toUpperCase() + (match.status as string).slice(1)}
          </Badge>
        </div>
        <h3 className="text-xl font-bold tracking-tight">
          {match.team1.name}
          <span className="text-muted-foreground mx-2">vs</span>
          {match.team2.name}
        </h3>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-2">
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="w-4 h-4 mr-2" />
            <time dateTime={match.match_date}>
              {new Date(match.match_date).toLocaleString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </time>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{match.venue}</span>
          </div>
          {match.result_details && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                {match.result_details}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MatchHistory: React.FC = () => {
  const [userDetails, setUserDetails] = React.useState<any>({});
  const [userMatches, setUserMatches] = React.useState<any[]>([]);
  const { userId } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (userId) {
      getUserDetailsById(userId).then(details => {
        setUserDetails(details);
        console.log(details);
      });

      getUserMatches(userId).then(matches => {
        console.log(matches);
        setUserMatches(matches.data);
        console.log(matches.data);
      });
    } else {
      console.error("User ID is not available");
    }
  }, [userId]);

  const userCoins = userDetails.TotalPoints || 0;

  return (
    <div className={`flex flex-col h-screen p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="flex justify-between items-center mb-4">
        <img
          src={userDetails?.data?.ProfilePictureURL || avatarImage}
          alt="Avatar"
          className={`w-16 h-16 rounded-full border-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"} shadow-md hover:shadow-lg transition-shadow duration-300`}
        />
        <div className="flex items-center text-lg font-bold">
          <Coins className="w-6 h-6 text-yellow-500 mr-2" />
          {userDetails?.data?.TotalPoints}
        </div>
      </div>
      <div className="mt-4 flex-grow">
        <h2 className="text-xl font-semibold mb-2">Match Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userMatches?.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
