import { CheckCircleIcon, DocumentTextIcon } from "@heroicons/react/16/solid";
import { WarningModal } from "../../components/WarningModal";
import { useCertificates } from "../hooks/useCertificates";

export function Certificados() {
  const {
    certificados,
    error,
    emitirCertificado,
    modalIsOpen,
    modalMessage,
    modalType,
    closeModal,
  } = useCertificates();

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <DocumentTextIcon className="w-8 h-8 text-blue-500" />
        <h1 className="text-4xl font-bold text-white">Emissão de Certificados</h1>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Aluno
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Workshop
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Duração
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {certificados.map((certificado) => (
              <tr key={`${certificado.workshopId}-${certificado.userId}`} className="hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 text-white">{certificado.aluno}</td>
                <td className="px-6 py-4 text-gray-300">{certificado.workshop}</td>
                <td className="px-6 py-4 text-gray-300">{certificado.data}</td>
                <td className="px-6 py-4 text-gray-300">{certificado.duracao} horas</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => emitirCertificado(certificado.workshopId, certificado.userId)}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    Emitir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WarningModal isOpen={modalIsOpen} onClose={closeModal} message={modalMessage} type={modalType} />
    </div>
  );
}
