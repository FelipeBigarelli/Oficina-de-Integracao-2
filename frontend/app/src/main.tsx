import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import App from './App';
//import { Voluntario } from "./pages/Voluntario";
//import { Docente } from "./pages/Docente";
import { AuthPage } from "./features/auth/pages/AuthPage";
import  AuthRoute from "./features/auth/routes/AuthRoute";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthRoute> <App></App> </AuthRoute>} />
        <Route path="/auth" element={<AuthRoute> <AuthPage/> </AuthRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);