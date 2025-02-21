import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { WarningModal } from "../../components/WarningModal"; // Importe o WarningModal
import { WorkshopCard } from "../../components/WorkshopCard";
import { WorkshopModal } from "../components/WorkshopModal";
import { useWorkshops } from "../hooks/useWorkshops";
import { Workshop } from "../services/WorkshopService";

export function DocenteWorkshops() {
  const { workshops, handleDelete, handleCreateSuccess, handleUpdateSuccess } = useWorkshops();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workshopToEdit, setWorkshopToEdit] = useState<Workshop | null>(null);
  const [warningModal, setWarningModal] = useState({
    isOpen: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleDeleteWorkshop = async (id: number) => {
    const result = await handleDelete(id);
    setWarningModal({
      isOpen: true,
      message: result.message,
      type: result.success ? "success" : "error",
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
            onEdit={() => {
              setWorkshopToEdit(workshop);
              setIsModalOpen(true);
            }}
            onDelete={() => handleDeleteWorkshop(workshop.id)}
          />
        ))}
      </div>
    </div>
  );
}