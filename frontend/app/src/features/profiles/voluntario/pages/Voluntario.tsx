import { CalendarIcon, UserIcon } from "@heroicons/react/16/solid";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export function Voluntario() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Meu Perfil",
      path: "/voluntario/perfil",
      icon: <UserIcon />,
    },
    {
      title: "Workshops",
      path: "/voluntario/workshops",
      icon: <CalendarIcon />,
    },
  ].map((item) => ({
    ...item,
    isActive: location.pathname === item.path,
  }));

  return (
    <div className="flex h-screen bg-[#282c34]">
      <div className="fixed left-0 top-0 h-full z-50">
        <Sidebar menuItems={menuItems} onNavigate={(path) => navigate(path)} />
      </div>

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
