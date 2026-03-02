import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/animations.css';
import { Navbar } from './components/Navbar';
import { ChatWidget } from './components/ChatWidget';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Features } from './pages/Features';
import { FarmingTechniques } from './pages/FarmingTechniques';
import { SoilInformation } from './pages/SoilInformation';
import { Marketplace } from './pages/Marketplace';
import { ImageAnalysis } from './pages/ImageAnalysis';
import './styles/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/features" element={<Features />} />
          <Route path="/farming-techniques" element={<FarmingTechniques />} />
          <Route path="/soil-information" element={<SoilInformation />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/image-analysis" element={<ImageAnalysis />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideNavbar && <Footer />}
      {!hideNavbar && <ChatWidget />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <AppLayout />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
