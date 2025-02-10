// components/Certificados.tsx
import { CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { VoluntarioService } from '../services/VoluntarioService';

interface Certificado {
  id: string; // ID do workshop
  aluno: string;
  workshop: string;
  data: string;
  duracao: number;
}

export function Certificados() {
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emitting, setEmitting] = useState(false); // Estado para controlar a emissão

  useEffect(() => {
    const loadWorkshopsInscritos = async () => {
      try {
        const workshopsInscritos = await VoluntarioService.listarWorkshopsInscritos();

        // Mapear os dados da resposta para o formato de Certificado
        const certificadosFormatados = workshopsInscritos.map((workshop) => ({
          id: workshop.id_workshop,
          aluno: workshop.nome_usuario,
          workshop: workshop.nome_workshop,
          data: new Date(workshop.data_workshop).toLocaleDateString(),
          duracao: workshop.duracao_workshop,
        }));

        setCertificados(certificadosFormatados);
      } catch (err) {
        setError('Erro ao carregar workshops inscritos');
      } finally {
        setLoading(false);
      }
    };

    loadWorkshopsInscritos();
  }, []);

  const handleEmitirCertificado = async (id: string) => {
    if (!confirm('Deseja realmente emitir este certificado?')) return;
  
    setEmitting(true);
    try {
      const response = await VoluntarioService.emitirCertificado(id);
  
      // Parse the response as JSON
      const jsonData = JSON.parse(response.certificate_url);
  
      // Access the certificate_url property
      const certificateUrl = jsonData.certificate_url;
  
      // Verifica se o link está presente e é válido
      if (certificateUrl) {
        const url = new URL(certificateUrl);
  
        // Verifica se o protocolo é HTTP ou HTTPS
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          // Abre o link em nova guia
          window.open(certificateUrl, '_blank');
          alert('Certificado gerado com sucesso!');
        } else {
          throw new Error('Link do certificado inválido');
        }
      } else {
        throw new Error('Link do certificado não encontrado na resposta');
      }
    } catch (err) {
      console.error('Erro ao emitir certificado:', err);
      alert(err instanceof Error? err.message: 'Erro ao emitir certificado');
    } finally {
      setEmitting(false);
    }
  };

  if (loading) return <div className="text-white p-6">Carregando certificados...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

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
              <tr key={certificado.id} className="hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 text-white">{certificado.aluno}</td>
                <td className="px-6 py-4 text-gray-300">{certificado.workshop}</td>
                <td className="px-6 py-4 text-gray-300">{certificado.data}</td>
                <td className="px-6 py-4 text-gray-300">{certificado.duracao} horas</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEmitirCertificado(certificado.id)}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
                    disabled={emitting}
                  >
                    {emitting ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <CheckCircleIcon className="w-5 h-5" />
                    )}
                    {emitting ? 'Emitindo...' : 'Emitir'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}