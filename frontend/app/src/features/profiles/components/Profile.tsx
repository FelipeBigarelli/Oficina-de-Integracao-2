import { useEffect, useState } from "react";
import { getUser } from "../../auth/services/Authentication";
import { ProfileField } from "./ProfileField";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  ra?: string;
  is_admin: boolean;
}

export function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = () => {
      const userData = getUser();
      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          ra: userData.RA,
          is_admin: userData.is_admin,
        });
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="text-red-500 p-6">Erro ao carregar perfil</div>;
  }

  return (
    <div className="mx-auto p-6"> 
      <h1 className="text-4xl font-bold text-white mb-8">Meu Perfil</h1>

      <div className="flex justify-center">
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-shadow w-full max-w-lg"> 
          <div className="space-y-4">
            <ProfileField label="Nome" value={user.name} />
            <ProfileField label="Email" value={user.email} />
            <ProfileField label="RA" value={user.ra} />
            <ProfileField
              label="Tipo de Conta"
              value={user.is_admin ? "Administrador" : "Voluntário"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}