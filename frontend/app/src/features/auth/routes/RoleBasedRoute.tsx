import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../services/Authentication';

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: ('admin' | 'voluntario')[];
}

export const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
  const user = getUser();
  const userRole = user?.is_admin ? 'admin' : 'voluntario';

  // Se o usuário não tem permissão OU não está autenticado
  if (!allowedRoles.includes(userRole) || !user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};