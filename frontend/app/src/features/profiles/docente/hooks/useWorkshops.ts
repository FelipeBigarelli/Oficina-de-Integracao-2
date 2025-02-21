import { useEffect, useState } from "react";
import { Workshop, WorkshopService } from "../services/WorkshopService";

export function useWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState("");

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
      return { success: true, message: "Workshop excluído com sucesso!" };
    } catch (err) {
      return { success: false, message: "Erro ao excluir workshop" };
    }
  };

  const handleCreateSuccess = (newWorkshop: Workshop) => {
    setWorkshops((prev) => [...prev, newWorkshop]);
  };

  const handleUpdateSuccess = (updatedWorkshop: Workshop) => {
    setWorkshops((prev) =>
      prev.map((w) => (w.id === updatedWorkshop.id ? updatedWorkshop : w))
    );
  };

  

  return {
    workshops,
    error,
    handleDelete,
    handleCreateSuccess,
    handleUpdateSuccess,
  };

  
}
