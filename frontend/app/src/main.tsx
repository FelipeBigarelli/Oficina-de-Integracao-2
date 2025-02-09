import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { App } from "./App";
import { AuthPage } from "./features/auth/pages/AuthPage";
import { ProtectedRoute } from "./features/auth/routes/ProtectedRoute";
import { RoleBasedRoute } from "./features/auth/routes/RoleBasedRoute";
import { Docente } from "./features/profiles/docente/pages/Docente";
import { Certificados } from "./features/profiles/voluntario/pages/Certificados";
import { Perfil } from "./features/profiles/voluntario/pages/Perfil";
import { Voluntario } from "./features/profiles/voluntario/pages/Voluntario";
import { Workshops } from "./features/profiles/voluntario/pages/Workshops";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Rota raiz - hub central */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

        {/* Rota de autenticação (não acessível se logado) */}
        <Route
          path="/auth"
          element={
            <ProtectedRoute requireAuth={false}>
              <AuthPage />
            </ProtectedRoute>
          }
        />

        {/* Rota de voluntário (apenas para não-admins) */}
        <Route
          path="/voluntario"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["voluntario"]}>
                <Voluntario />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >

          <Route path="perfil" element={<Perfil />} />
          <Route path="workshops" element={<Workshops />} />
          <Route path="certificados" element={<Certificados />} />

        </Route>

        {/* Rota de docente (apenas para admins) */}
        <Route
          path="/docente"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin"]}>
                <Docente />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/voluntario/workshops"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["voluntario"]}>
                <Workshops />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
