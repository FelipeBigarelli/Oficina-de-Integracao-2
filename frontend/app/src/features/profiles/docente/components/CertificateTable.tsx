import { CheckCircleIcon } from "@heroicons/react/16/solid";

interface Certificado {
  workshopId: string;
  userId: string;
  aluno: string;
  workshop: string;
  data: string;
  duracao: number;
}

interface Props {
  certificados: Certificado[];
  onEmitirCertificado: (workshopId: string, userId: string) => void;
}

export function CertificateTable({ certificados, onEmitirCertificado }: Props) {
  return (
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
                  onClick={() => onEmitirCertificado(certificado.workshopId, certificado.userId)}
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
  );
}
