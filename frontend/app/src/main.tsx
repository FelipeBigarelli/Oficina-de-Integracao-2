import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import App from './App';
import { Voluntario } from "./pages/Voluntario";
import { Docente } from "./pages/Docente";
import { Auth } from "./pages/Auth";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/docente" element={<Docente />} />
        <Route path="/voluntario" element={<Voluntario/>} />
      </Routes>
    </Router>
  </React.StrictMode>

);