import {
  AcademicCapIcon,
  BookOpenIcon,
  UserIcon
} from "@heroicons/react/16/solid";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";

export const Docente = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Meu Perfil",
      path: "/docente/perfil",
      icon: <UserIcon />,
    },
    {
      title: "Workshops",
      path: "/docente/workshops",
      icon: <BookOpenIcon />,
    },
    {
      title: "Alunos",
      path: "/docente/alunos",
      icon: <AcademicCapIcon />,
    },
    {
      title: "Certificados",
      path: "/docente/certificados",
      icon: <BookOpenIcon />,
    },
  ].map(item => ({
  ...item,
    isActive: location.pathname === item.path
  }));

  return (
    <div className="flex h-screen bg-[#282c34]">
      <div className="fixed left-0 top-0 h-full z-50">
        <Sidebar
          menuItems={menuItems}
          onNavigate={(path) => navigate(path)}
        />
      </div>

      <main className="flex-1 ml-64 p-8">
        <Outlet /> 
      </main>
    </div>
  );
};