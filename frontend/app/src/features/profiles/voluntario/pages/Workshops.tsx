import { CalendarIcon, ClockIcon } from "@heroicons/react/16/solid";

interface Workshop {
  id: number;
  title: string;
  date: string;
  duration: string;
  description: string;
  availableSpots: number;
}

export function Workshops() {
  // Dados estáticos temporários
  const workshops: Workshop[] = [
    {
      id: 1,
      title: "Introdução à Programação",
      date: "15/08/2024",
      duration: "3 horas",
      description: "Aprenda os conceitos básicos de programação usando Python",
      availableSpots: 12,
    },
    {
      id: 2,
      title: "Robótica Educacional",
      date: "20/08/2024",
      duration: "4 horas",
      description: "Montagem e programação de robôs simples com Arduino",
      availableSpots: 8,
    },
    {
      id: 3,
      title: "Lógica de Jogos",
      date: "25/08/2024",
      duration: "5 horas",
      description: "Desenvolvimento de algoritmos para jogos simples",
      availableSpots: 15,
    },
    {
      id: 4,
      title: "Robótica Educacional",
      date: "20/08/2024",
      duration: "4 horas",
      description: "Montagem e programação de robôs simples com Arduino",
      availableSpots: 8,
    },
    {
      id: 5,
      title: "Lógica de Jogos",
      date: "25/08/2024",
      duration: "5 horas",
      description: "Desenvolvimento de algoritmos para jogos simples",
      availableSpots: 15,
    },
  ];

  const handleRegistration = (workshopId: number) => {
    alert(`Inscrição realizada para o workshop ID: ${workshopId}`);
    // Aqui você implementará a lógica de inscrição quando tiver o backend
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-white mb-8">Workshops Disponíveis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">{workshop.title}</h2>
              
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{workshop.date}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <ClockIcon className="w-5 h-5" />
                <span>{workshop.duration}</span>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{workshop.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-medium">
                Vagas disponíveis: {workshop.availableSpots}
              </span>
              <button
                onClick={() => handleRegistration(workshop.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Inscrever-se
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}