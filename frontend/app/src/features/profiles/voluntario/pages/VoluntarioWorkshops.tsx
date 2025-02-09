import { WorkshopCard } from "../../components/WorkshopCard";

interface VoluntarioWorkshop {
  id: number;
  title: string;
  date: string;
  duration: string;
  description: string;
  availableSpots: number;
}

export function VoluntarioWorkshops() {
  // Dados estáticos temporários
  const workshops: VoluntarioWorkshop[] = [
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
      <h1 className="text-4xl font-bold text-white mb-8">
        Workshops Disponíveis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            variant="voluntario"
            title={workshop.title}
            date={workshop.date}
            duration={workshop.duration}
            description={workshop.description}
            spotsText={`Vagas disponíveis: ${workshop.availableSpots}`}
            onSubscribe={() => handleRegistration(workshop.id)}
          />
        ))}
      </div>
    </div>
  );
}
