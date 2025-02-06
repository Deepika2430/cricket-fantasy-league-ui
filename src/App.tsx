import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Matches from './components/Matches';
import Team from './components/TeamSelection';
import Signout from './components/Signout';
import { getUserFromToken } from './services/AuthService';
import { AuthProvider } from './context/AuthContext';

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
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/team" element={<Team />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/signout" element={<Signout />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;