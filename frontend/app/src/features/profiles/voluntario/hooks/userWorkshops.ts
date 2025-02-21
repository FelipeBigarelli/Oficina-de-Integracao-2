import { useEffect, useState } from "react";
import { WorkshopService } from "../../docente/services/WorkshopService";

export function useWorkshops() {
  const [workshops, setWorkshops] = useState<any[]>([]);
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

  return { workshops, error };
}
