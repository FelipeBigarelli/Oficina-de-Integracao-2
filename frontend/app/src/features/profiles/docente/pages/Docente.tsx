import {
    AcademicCapIcon,
    BookOpenIcon,
    ChartBarIcon
} from "@heroicons/react/16/solid";
import Sidebar from "../../components/Sidebar";
  
  export const Docente = () => {
    const menuItems = [
      {
        title: "Dashboard",
        path: "/docente",
        icon: <ChartBarIcon />,
        isActive: true,
      },
      {
        title: "Cursos",
        path: "/docente/cursos",
        icon: <BookOpenIcon />,
      },
      {
        title: "Alunos",
        path: "/docente/alunos",
        icon: <AcademicCapIcon />,
      },
    ];
  
    return (
      <div className="flex h-screen bg-[#282c34]">
        {/* Sidebar fixa */}
        <div className="fixed left-0 top-0 h-full z-50">
          <Sidebar
            menuItems={menuItems}
            onNavigate={(path) => console.log("Navegar para:", path)}
          />
        </div>
  
        {/* Conteúdo principal */}
        <main className="flex-1 ml-64 p-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            Você está logado como docente
          </h1>
          
          {/* Conteúdo específico do docente */}
          <div className="space-y-4">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl text-white mb-4">Estatísticas</h2>
              {/* Conteúdo do dashboard */}
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl text-white mb-4">Últimas Atividades</h2>
              {/* Listagem de atividades */}
            </div>
          </div>
        </main>
      </div>
    );
  };