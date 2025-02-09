import { Navigate } from 'react-router-dom';
import { getUser } from '../services/Authentication';

import { ReactNode } from 'react';

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = getUser();

  if (!user ||!user.is_admin) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};