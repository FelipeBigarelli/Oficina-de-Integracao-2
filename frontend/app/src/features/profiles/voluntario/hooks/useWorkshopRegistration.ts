import { useState } from "react";
import { VoluntarioService } from "../services/VoluntarioService";

export function useWorkshopRegistration(workshops: any[]) {
  const [warningModal, setWarningModal] = useState({
    isOpen: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleRegistration = async (workshopId: number) => {
    try {
      const workshop = workshops.find(w => w.id === workshopId);
      
      if (!workshop) {
        throw new Error("Workshop não encontrado.");
      }
  
      await VoluntarioService.inscrever(workshopId.toString());
  
      setWarningModal({
        isOpen: true,
        message: 
          "✅ Inscrição realizada com sucesso! 📌\n\n" +
          `Workshop: ${workshop.title} \n` +
          `📅 Data: ${new Date(workshop.date).toLocaleDateString()}\n` +
          `⏳ Duração: ${workshop.duration} horas`,
        type: "success",
      });
    } catch (err) {
      setWarningModal({
        isOpen: true,
        message: 
          "❌ Erro ao realizar inscrição:\n\n" +
          (err instanceof Error ? err.message : "Erro desconhecido"),
        type: "error",
      });
    }
  };

  return { handleRegistration, warningModal, setWarningModal };
}
