import { WarningModal } from "../../components/WarningModal"; // Importe o WarningModal
import { WorkshopCard } from "../../components/WorkshopCard";
import { useWorkshops } from "../../docente/hooks/useWorkshops";
import { useWorkshopRegistration } from "../hooks/useWorkshopRegistration";

export function VoluntarioWorkshops() {
  const { workshops, error } = useWorkshops();
  const { handleRegistration, warningModal, setWarningModal } =
    useWorkshopRegistration(workshops);

  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-white mb-8">
        Workshops Disponíveis
      </h1>

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
