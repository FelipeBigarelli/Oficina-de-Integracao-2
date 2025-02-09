import { PlusIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { WorkshopCard } from '../../components/WorkshopCard';

interface Workshop {
  id: number;
  title: string;
  date: string;
  duration: number;
  description: string;
  participants: number;
}

export function DocenteWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: 1,
      title: "Programação Básica",
      date: "15/08/2024",
        duration: 3,
      description: "Aprenda os conceitos básicos de programação",
      participants: 12,
    },
    {
      id: 2,
      title: "Robótica Educacional",
      date: "20/08/2024",
        duration: 4,
      description: "Montagem e programação de robôs simples",
      participants: 8,
    },
  ]);

  const handleCreate = () => {
    // Lógica para criar novo workshop
    console.log('Criar novo workshop');
  };

  const handleEdit = (id: number) => {
    // Lógica para editar workshop
    console.log('Editar workshop:', id);
  };

  const handleDelete = (id: number) => {
    // Lógica para deletar workshop
    setWorkshops(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Gerenciar Workshops</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Novo Workshop
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            variant="docente"
            title={workshop.title}
            date={workshop.date}
            duration={`${workshop.duration} horas`}
            description={workshop.description}
            spotsText={`${workshop.participants} participantes`}
            onEdit={() => handleEdit(workshop.id)}
            onDelete={() => handleDelete(workshop.id)}
          />
        ))}
      </div>
    </div>
  );
}