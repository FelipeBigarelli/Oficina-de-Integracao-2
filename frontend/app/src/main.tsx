import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { App } from "./App";
import { AuthPage } from "./features/auth/pages/AuthPage";
import { ProtectedRoute } from "./features/auth/routes/ProtectedRoute";
import { RoleBasedRoute } from "./features/auth/routes/RoleBasedRoute";
import { Profile } from "./features/profiles/components/Profile";
import { Alunos } from "./features/profiles/docente/pages/Alunos";
import { Certificados } from "./features/profiles/docente/pages/Certificados";
import { Docente } from "./features/profiles/docente/pages/Docente";
import { DocenteWorkshops } from "./features/profiles/docente/pages/DocenteWorkshops";
import { Voluntario } from "./features/profiles/voluntario/pages/Voluntario";
import { VoluntarioWorkshops } from "./features/profiles/voluntario/pages/VoluntarioWorkshops";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
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

          <Route path="perfil" element={<Profile />} />
          <Route path="workshops" element={<VoluntarioWorkshops />} />

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
        >
          <Route path="workshops" element={<DocenteWorkshops />} />
          <Route path="alunos" element={<Alunos />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="certificados" element={<Certificados />} />
        </Route>

      </Routes>
    </Router>
  </React.StrictMode>
);
