
import { logout } from './features/auth/services/Authentication';
import { getUser } from './features/auth/services/Authentication';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate(); // Hook para navegação

  const handleLogout = () => {
    logout();
    navigate("/auth"); 
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#282c34] items-center justify-center">
      <h1 className="text-xl font-bold text-white mb-6">Ola, {getUser()?.name}</h1>
      <h1 className="text-2xl font-bold text-white mb-6">Voce esta logado.</h1>
      <h2 className="text-4xl font-bold text-white mb-6"> 
        Você é {getUser()?.is_admin ? 'Admin' : 'Voluntário'}
      </h2>
      <button
        onClick={handleLogout}
        className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default App;
