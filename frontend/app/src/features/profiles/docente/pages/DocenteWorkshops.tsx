import { PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { WorkshopCard } from "../../components/WorkshopCard";
import { WorkshopModal } from "../components/WorkshopModal";
import { Workshop, WorkshopService } from "../services/WorkshopService";

export function DocenteWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await WorkshopService.getAll();
        setWorkshops(data);
      } catch (err) {
        setError("Erro ao carregar workshops");
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await WorkshopService.delete(id);
      setWorkshops((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      alert("Erro ao excluir workshop");
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const workshopToEdit = workshops.find((w) => w.id === id);
      if (!workshopToEdit) return;

      const updatedWorkshop = await WorkshopService.update(id, workshopToEdit);
      setWorkshops((prev) =>
        prev.map((w) => (w.id === id ? updatedWorkshop : w))
      );
    } catch (err) {
      alert("Erro ao atualizar workshop");
    }
  };

  const handleCreateSuccess = (newWorkshop: Workshop) => {
    setWorkshops((prev) => [...prev, newWorkshop]);
    setIsModalOpen(false);
  };

  if (loading)
    return <div className="text-white p-6">Carregando workshops...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Gerenciar Workshops</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Novo Workshop
        </button>
      </div>

      <WorkshopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateSuccess}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            variant="docente"
            title={workshop.title}
            date={new Date(workshop.date).toLocaleDateString()}
            duration={`${workshop.duration} horas`}
            description={workshop.description}
            onEdit={() => handleEdit(workshop.id)}
            onDelete={() => handleDelete(workshop.id)}
          />
        ))}
      </div>
    </div>
  );
}
