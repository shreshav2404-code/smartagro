import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import FarmingTechniques from './pages/FarmingTechniques';
import SoilInformation from './pages/SoilInformation';
import Features from './pages/Features';
import ImageAnalysis from './pages/ImageAnalysis';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
        <Route
          path="/marketplace"
          element={user ? <Marketplace user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/farming-techniques"
          element={user ? <FarmingTechniques user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/soil-information"
          element={user ? <SoilInformation user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/features"
          element={<Features user={user} />}
        />
        <Route
          path="/image-analysis"
          element={user ? <ImageAnalysis user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
