import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from './features/auth/services/Authentication';

export function App() {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    // Adicione esta verificação para evitar loop
    const currentPath = window.location.pathname;
    
    if (user?.is_admin && !currentPath.startsWith('/docente')) {
      navigate('/docente');
    } else if (!user?.is_admin && !currentPath.startsWith('/voluntario')) {
      navigate('/voluntario');
    }
  }, [user, navigate]);

  return null;
}