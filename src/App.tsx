import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Profile from './components/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/dashboard');
  //   } else {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <Routes>
      {/* <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/home" element={isAuthenticated ? <Layout><Home /></Layout> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
      <Route path="/profile" element={isAuthenticated ? <Layout><Profile /></Layout> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} /> */}
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/home" element={<Layout><Home /></Layout>} />
      <Route path="/dashboard" element={ <Layout><Dashboard /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;