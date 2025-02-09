import { useEffect, useState } from 'react';
import { WorkshopCard } from "../../components/WorkshopCard";
import { WorkshopService } from '../../docente/services/WorkshopService';
import { VoluntarioService } from '../../voluntario/services/VoluntarioService';

export function VoluntarioWorkshops() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await WorkshopService.getAll();
        setWorkshops(data);
      } catch (err) {
        setError('Erro ao carregar workshops');
      }
    };

    loadWorkshops();
  }, []);

  const handleRegistration = async (workshopId: number) => {
    try {
      // Converta o workshopId para string
      await VoluntarioService.inscrever(workshopId.toString());
      alert(`Inscrição realizada com sucesso para o workshop ID: ${workshopId}`);
    } catch (err) {
      alert('Erro ao realizar inscrição: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
    }
  };

  if (error) return <div className="text-red-500 p-6">{error}</div>;

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
            date={new Date(workshop.date).toLocaleDateString()}
            duration={`${workshop.duration} horas`}
            description={workshop.description}
            onSubscribe={() => handleRegistration(workshop.id)}
          />
        ))}
      </div>
    </div>
  );
}