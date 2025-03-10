import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Layout from "./components/Layout";
import MatchHistory from "./components/MatchHistory";
import Matches from "./components/Matches";
import Team from "./components/TeamSelection";
import Groups from "./components/Groups";
import Friends from "./components/Friends";
import Account from "./components/Account";
import { getUserFromToken } from "./services/AuthService";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NotFound from "./components/NotFound";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import CricketLiveScore from "./components/CricketLiveScore";
import AdminMatches from "./components/admin/AdminMatches";
import AdminDashboard from "./components/admin/AdminDashboard";
import { isAdmin } from "./utils/authUtils";

function AppRoutes() {
  const { role } = useAuth(); // Get role from AuthContext
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const user = getUserFromToken(token);
      setUserId(user);
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/livescore" element={<CricketLiveScore />} />
      <Route path="/login" element={<Login />} />

      {role === "admin" ? (
        <Route element={<Layout role="admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-matches" element={<AdminMatches />} />
          <Route path="/admin-teams" element={<>Teams</>} />
          <Route path="/admin-players" element={<>Players</>} />
          <Route path="/my-profile" element={<Account />} />
        </Route>
      ) : (
        <Route element={<Layout role="user" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/match-history" element={<MatchHistory />} />
          <Route path="/team" element={<Team />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/my-profile" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
