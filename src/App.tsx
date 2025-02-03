import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Trophy, Users, Calendar, Settings, Star, ChevronUp, ChevronDown } from 'lucide-react';
import { Player, UserTeam } from './types';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import BatsmanAnimation from './components/BatsmanAnimation';
import Sidebar from './components/SideBar';

const REACT_APP_API_URL = "http://localhost:8080/api/v1"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userTeam, setUserTeam] = useState<UserTeam>({
    id: '1',
    name: 'My Dream Team',
    players: [],
    totalPoints: 0,
    budget: 100
  });
  const [teamNameEdit, setTeamNameEdit] = useState(false);
  const [newTeamName, setNewTeamName] = useState(userTeam.name);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);


  const handleLogin = async (email: string, password: string) => {
    try {
      // const response = await fetch(`${REACT_APP_API_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      //   mode: 'cors',
      // });

      // const data = await response.json();

      // if (data.success) {
      //   setIsAuthenticated(true);
      //   console.log('Logged in successfully');
      //   navigate('/dashboard'); // Navigate to dashboard after successful login
      // } else {
      //   console.error('Login failed');
      // }
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<BatsmanAnimation />} />
      <Route path="/login" element={<AuthForm onLogin={handleLogin} />} />
      <Route path="/dashboard" element={isAuthenticated ? <Sidebar
        userTeam={userTeam}
        addPlayerToTeam={(player: Player) => {
          setUserTeam((prevTeam) => ({
            ...prevTeam,
            players: [...prevTeam.players, player],
          }));
        }}
        removePlayer={(playerId: string) => {
          setUserTeam((prevTeam) => ({
            ...prevTeam,
            players: prevTeam.players.filter((player) => player.id !== playerId),
          }));
        }}
        setCaptain={(playerId: string) => {
          setUserTeam((prevTeam) => ({
            ...prevTeam,
            players: prevTeam.players.map((player) =>
              player.id === playerId ? { ...player, isCaptain: true } : { ...player, isCaptain: false }
            ),
          }));
        }}
        teamNameEdit={teamNameEdit}
        setTeamNameEdit={setTeamNameEdit}
        newTeamName={newTeamName}
        setNewTeamName={setNewTeamName}
      /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;