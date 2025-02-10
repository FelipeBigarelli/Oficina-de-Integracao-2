import { PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { WarningModal } from "../../components/WarningModal"; // Importe o WarningModal
import { WorkshopCard } from "../../components/WorkshopCard";
import { WorkshopModal } from "../components/WorkshopModal";
import { Workshop, WorkshopService } from "../services/WorkshopService";

export function DocenteWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workshopToEdit, setWorkshopToEdit] = useState<Workshop | null>(null);
  const [error, setError] = useState("");
  const [warningModal, setWarningModal] = useState({
    isOpen: false,
    message: "",
    type: "success" as "success" | "error",
  });

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await WorkshopService.getAll();
        setWorkshops(data);
      } catch (err) {
        setError("Erro ao carregar workshops");
      }
    };

    loadWorkshops();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await WorkshopService.delete(id);
      setWorkshops((prev) => prev.filter((w) => w.id !== id));
      setWarningModal({
        isOpen: true,
        message: "Workshop excluído com sucesso!",
        type: "success",
      });
    } catch (err) {
      setWarningModal({
        isOpen: true,
        message: "Erro ao excluir workshop",
        type: "error",
      });
    }
  };

  const handleEdit = (workshop: Workshop) => {
    setWorkshopToEdit(workshop);
    setIsModalOpen(true);
  };

  const handleCreateSuccess = (newWorkshop: Workshop) => {
    setWorkshops((prev) => [...prev, newWorkshop]);
    setIsModalOpen(false);
    setWarningModal({
      isOpen: true,
      message: "Workshop criado com sucesso!",
      type: "success",
    });
  };

  const handleUpdateSuccess = (updatedWorkshop: Workshop) => {
    setWorkshops((prev) =>
      prev.map((w) => (w.id === updatedWorkshop.id ? updatedWorkshop : w))
    );
    setIsModalOpen(false);
    setWorkshopToEdit(null);
    setWarningModal({
      isOpen: true,
      message: "Workshop atualizado com sucesso!",
      type: "success",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Gerenciar Workshops</h1>
        <button
          onClick={() => {
            setWorkshopToEdit(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Novo Workshop
        </button>
      </div>

      <WorkshopModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setWorkshopToEdit(null);
        }}
        onCreate={handleCreateSuccess}
        onUpdate={handleUpdateSuccess}
        workshopToEdit={workshopToEdit}
      />

      <WarningModal
        isOpen={warningModal.isOpen}
        onClose={() => setWarningModal({ ...warningModal, isOpen: false })}
        message={warningModal.message}
        type={warningModal.type}
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
            onEdit={() => handleEdit(workshop)}
            onDelete={() => handleDelete(workshop.id)}
          />
        ))}
      </div>
    </div>
  );
}