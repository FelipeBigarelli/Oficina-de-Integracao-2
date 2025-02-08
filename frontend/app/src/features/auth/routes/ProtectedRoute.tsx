import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/Authentication';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
    const auth = isAuthenticated();

    if (requireAuth && !auth) {
        return <Navigate to="/auth" replace />;
    }

    if (!requireAuth && auth) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};