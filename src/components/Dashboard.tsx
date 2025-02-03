import React, { useState } from 'react';
import { Trophy, Users, Calendar, Settings, Star, ChevronUp, ChevronDown } from 'lucide-react';
import { Player, UserTeam } from '../types';
import { samplePlayers, sampleMatches, sampleLeaderboard } from '../data/sampleData';

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<'teams' | 'matches' | 'leaderboard' | 'settings'>('teams');
  const [userTeam, setUserTeam] = useState<UserTeam>({
    id: '1',
    name: 'My Dream Team',
    players: [],
    totalPoints: 0,
    budget: 100
  });
  const [teamNameEdit, setTeamNameEdit] = useState(false);
  const [newTeamName, setNewTeamName] = useState(userTeam.name);

  const addPlayerToTeam = (player: Player) => {
    if (userTeam.players.length >= 11) {
      alert('Team can only have 11 players!');
      return;
    }
    if (userTeam.budget < player.price) {
      alert('Not enough budget!');
      return;
    }
    if (userTeam.players.some(p => p.id === player.id)) {
      alert('Player already in team!');
      return;
    }
    setUserTeam(prev => ({
      ...prev,
      players: [...prev.players, player],
      budget: Number((prev.budget - player.price).toFixed(1)),
      totalPoints: prev.totalPoints + player.points
    }));
  };

  const removePlayer = (player: Player) => {
    setUserTeam(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== player.id),
      budget: Number((prev.budget + player.price).toFixed(1)),
      totalPoints: prev.totalPoints - player.points,
      captain: prev.captain?.id === player.id ? undefined : prev.captain,
      viceCaptain: prev.viceCaptain?.id === player.id ? undefined : prev.viceCaptain
    }));
  };

  const setCaptain = (player: Player) => {
    if (userTeam.viceCaptain?.id === player.id) {
      alert('Player is already Vice Captain!');
      return;
    }
    setUserTeam(prev => ({
      ...prev,
      captain: player
    }));
  };

  const setViceCaptain = (player: Player) => {
    if (userTeam.captain?.id === player.id) {
      alert('Player is already Captain!');
      return;
    }
    setUserTeam(prev => ({
      ...prev,
      viceCaptain: player
    }));
  };

  const updateTeamName = () => {
    if (newTeamName.trim()) {
      setUserTeam(prev => ({
        ...prev,
        name: newTeamName
      }));
      setTeamNameEdit(false);
    }
  };

  const getMatchStatusBadge = (status: Match['status']) => {
    switch (status) {
      case 'Live':
        return (
          <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium animate-pulse">
            Live
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
            Upcoming
          </span>
        );
    }
  };

  const formatOvers = (overs: number) => {
    return overs.toFixed(1);
  };

  const renderLiveScore = (match: Match) => {
    if (!match.score) return null;

    return (
      <div className="mt-4 space-y-4">
        {/* Score Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-white font-medium">{match.team1}</div>
            <div className="text-2xl font-bold text-white">
              {match.score.team1.runs}/{match.score.team1.wickets}
            </div>
            <div className="text-white/60 text-sm">
              {formatOvers(match.score.team1.overs)} overs
            </div>
          </div>
          {match.score.team2 && (
            <div>
              <div className="text-white font-medium">{match.team2}</div>
              <div className="text-2xl font-bold text-white">
                {match.score.team2.runs}/{match.score.team2.wickets}
              </div>
              <div className="text-white/60 text-sm">
                {formatOvers(match.score.team2.overs)} overs
              </div>
            </div>
          )}
        </div>

        {/* Current Batsmen and Bowler */}
        {match.score.currentBatsmen && (
          <div className="bg-white/5 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-white/60 text-sm mb-2">Batting</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">
                      {match.score.currentBatsmen.striker} *
                    </span>
                    <span className="text-white">
                      {match.score.currentBatsmen.strikerRuns} ({match.score.currentBatsmen.strikerBalls})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-medium">
                      {match.score.currentBatsmen.nonStriker}
                    </span>
                    <span className="text-white">
                      {match.score.currentBatsmen.nonStrikerRuns} ({match.score.currentBatsmen.nonStrikerBalls})
                    </span>
                  </div>
                </div>
              </div>
              {match.score.currentBowler && (
                <div>
                  <h4 className="text-white/60 text-sm mb-2">Bowling</h4>
                  <div className="text-white font-medium">
                    {match.score.currentBowler.name}
                  </div>
                  <div className="text-white/60 text-sm">
                    {match.score.currentBowler.wickets}/{match.score.currentBowler.runs} ({formatOvers(match.score.currentBowler.overs)})
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Balls */}
        {match.score.recentBalls && (
          <div>
            <h4 className="text-white/60 text-sm mb-2">Recent Balls</h4>
            <div className="flex gap-2">
              {match.score.recentBalls.map((ball, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    ball === 'W' ? 'bg-red-500/20 text-red-300' :
                    ball === '4' ? 'bg-green-500/20 text-green-300' :
                    ball === '6' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-white/10 text-white'
                  }`}
                >
                  {ball}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-white">Fantasy Cricket League</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <nav className="bg-white/5 backdrop-blur-md rounded-xl p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedTab('teams')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedTab === 'teams' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <Users size={20} />
                  Teams
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedTab('matches')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedTab === 'matches' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <Calendar size={20} />
                  Matches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedTab('leaderboard')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedTab === 'leaderboard' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <Trophy size={20} />
                  Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedTab === 'settings' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <Settings size={20} />
                  Settings
                </button>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <div className="md:col-span-3">
            {selectedTab === 'teams' && (
              <div className="space-y-6">
                {/* Team Summary */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    {teamNameEdit ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTeamName}
                          onChange={(e) => setNewTeamName(e.target.value)}
                          className="bg-white/10 text-white border border-white/20 rounded px-2 py-1"
                        />
                        <button
                          onClick={updateTeamName}
                          className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 rounded text-sm text-white"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        {userTeam.name}
                        <button
                          onClick={() => setTeamNameEdit(true)}
                          className="text-white/60 hover:text-white"
                        >
                          <Settings size={16} />
                        </button>
                      </h2>
                    )}
                    <div className="text-right">
                      <p className="text-sm text-white/60">Total Points</p>
                      <p className="text-2xl font-bold text-white">{userTeam.totalPoints}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-white/80">
                    <div>
                      <p className="text-sm">Budget Remaining</p>
                      <p className="text-2xl font-bold text-white">${userTeam.budget}M</p>
                    </div>
                    <div>
                      <p className="text-sm">Players</p>
                      <p className="text-2xl font-bold text-white">{userTeam.players.length}/11</p>
                    </div>
                  </div>
                </div>

                {/* Selected Players */}
                {userTeam.players.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Selected Players</h2>
                    <div className="space-y-3">
                      {userTeam.players.map(player => (
                        <div
                          key={player.id}
                          className="bg-white/10 rounded-lg p-4 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="text-white font-medium flex items-center gap-2">
                                {player.name}
                                {userTeam.captain?.id === player.id && (
                                  <span className="text-yellow-400">
                                    <Star size={16} fill="currentColor" />
                                  </span>
                                )}
                                {userTeam.viceCaptain?.id === player.id && (
                                  <span className="text-yellow-400/70">
                                    <Star size={14} />
                                  </span>
                                )}
                              </h3>
                              <p className="text-white/60 text-sm">{player.role} • {player.team}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => setCaptain(player)}
                                className="text-white/60 hover:text-white"
                                title="Make Captain"
                              >
                                <ChevronUp size={16} />
                              </button>
                              <button
                                onClick={() => setViceCaptain(player)}
                                className="text-white/60 hover:text-white"
                                title="Make Vice Captain"
                              >
                                <ChevronDown size={16} />
                              </button>
                            </div>
                            <button
                              onClick={() => removePlayer(player)}
                              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-sm text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Players */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Available Players</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {samplePlayers
                      .filter(player => !userTeam.players.some(p => p.id === player.id))
                      .map(player => (
                        <div
                          key={player.id}
                          className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-white font-medium">{player.name}</h3>
                              <p className="text-white/60 text-sm">{player.role}</p>
                            </div>
                            <span className="text-white/80 font-semibold">${player.price}M</span>
                          </div>
                          <div className="space-y-2 mb-4">
                            <div className="grid grid-cols-2 gap-2 text-sm text-white/60">
                              <div>Matches: {player.stats.matches}</div>
                              <div>Runs: {player.stats.runs}</div>
                              <div>Wickets: {player.stats.wickets}</div>
                              <div>Catches: {player.stats.catches}</div>
                              {player.stats.stumpings && (
                                <div>Stumpings: {player.stats.stumpings}</div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60 text-sm">{player.team}</span>
                            <button
                              onClick={() => addPlayerToTeam(player)}
                              className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 rounded text-sm text-white transition-colors"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'matches' && (
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Matches</h2>
                <div className="space-y-6">
                  {sampleMatches.map(match => (
                    <div
                      key={match.id}
                      className="bg-white/10 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-lg font-medium text-white">
                              {match.team1} vs {match.team2}
                            </div>
                            {getMatchStatusBadge(match.status)}
                          </div>
                          <div className="text-white/60 text-sm">
                            {match.venue}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {new Date(match.date).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </div>
                          <div className="text-white/60 text-sm">
                            {match.time} IST
                          </div>
                        </div>
                      </div>
                      {renderLiveScore(match)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'leaderboard' && (
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Leaderboard</h2>
                <div className="space-y-4">
                  {sampleLeaderboard.map((entry, index) => (
                    <div
                      key={index}
                      className={`bg-white/10 rounded-lg p-4 flex items-center ${
                        index === 0 ? 'bg-yellow-500/20' :
                        index === 1 ? 'bg-gray-400/20' :
                        index === 2 ? 'bg-amber-700/20' : ''
                      }`}
                    >
                      <div className="w-12 text-2xl font-bold text-white/80 text-center">
                        {entry.rank}
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-medium text-white">
                          {entry.teamName}
                        </div>
                        <div className="text-white/60 text-sm">
                          {entry.ownerName}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {entry.points}
                        </div>
                        <div className="text-white/60 text-sm">
                          points
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'settings' && (
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Team Name</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="bg-white/10 text-white border border-white/20 rounded px-3 py-2 w-full"
                      />
                      <button
                        onClick={updateTeamName}
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Game Rules</h3>
                    <div className="bg-white/10 rounded-lg p-4 space-y-2 text-white/80">
                      <p>• Maximum 11 players per team</p>
                      <p>• Budget cap of $100M</p>
                      <p>• Must select a captain and vice-captain</p>
                      <p>• Captain earns 2x points</p>
                      <p>• Vice-captain earns 1.5x points</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;