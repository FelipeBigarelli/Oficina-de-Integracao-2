// features/profiles/voluntario/pages/Perfil.tsx
import { useEffect, useState } from 'react';
import { getUser } from '../../../auth/services/Authentication';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  ra?: string;
  is_admin: boolean;
}

export function Perfil() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = () => {
      const userData = getUser();
      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          ra: userData.RA || 'Não informado', // Adapte conforme seu modelo de usuário
          is_admin: userData.is_admin
        });
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Erro ao carregar perfil</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Meu Perfil</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="space-y-4">
          <ProfileField label="Nome" value={user.name} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField label="RA" value={user.ra} />
          <ProfileField 
            label="Tipo de Conta" 
            value={user.is_admin ? 'Administrador' : 'Voluntário'} 
          />
        </div>
      </div>
    </div>
  );
}

const ProfileField = ({ label, value }: { label: string; value?: string }) => (
  <div className="border-b border-gray-700 pb-4">
    <dt className="text-sm font-medium text-gray-400">{label}</dt>
    <dd className="mt-1 text-lg text-white">{value || 'Não informado'}</dd>
  </div>
);