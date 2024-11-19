import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Routes> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
