import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Layout from './components/Layout';
import MatchHistory from './components/MatchHistory';
import Matches from './components/Matches';
import Team from './components/TeamSelection';
import Groups from './components/Groups';
import Friends from './components/Friends';
import Account from './components/Account';
import Signout from './components/Signout';
import { getUserFromToken } from './services/AuthService';
import { AuthProvider } from './context/AuthContext';
import NotFound from './components/NotFound'
import MainLayout from './components/MainLayout';
import Login from './components/Login';
import CricketLiveScore from './components/CricketLiveScore';
import AdminMatches from './components/admin/AdminMatches';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (isAuthenticated)
      setUserId(getUserFromToken(Cookies.get('authToken')));
    if (userId)
      setIsAuthenticated(true);
  });

  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/livescore" element={<CricketLiveScore />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout role={"admin"} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/admin-matches" element={<AdminMatches />} />
              <Route path="/match-history" element={<MatchHistory />} />
              <Route path="/team" element={<Team />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/my-profile" element={<Account />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/signout" element={<Signout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
