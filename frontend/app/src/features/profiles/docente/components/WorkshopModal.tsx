// components/WorkshopModal.tsx
import { useState } from 'react';
import { Workshop, WorkshopService } from '../services/WorkshopService';

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newWorkshop: Workshop) => void;
}

export function WorkshopModal({ isOpen, onClose, onCreate }: WorkshopModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    duration: 2,
    description: '',
    participants: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newWorkshop = await WorkshopService.create({
        title: formData.title,
        description: formData.description,
        date: formData.date, // ISO string (YYYY-MM-DD)
        duration: formData.duration * 60, // Convertendo horas para minutos
        participants: 0
      });
      onCreate(newWorkshop);
      onClose();
    } catch (error) {
      alert('Erro ao criar workshop');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Novo Workshop</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Data *
            </label>
            <input
              type="date"
              required
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Duração (horas) *
            </label>
            <input
              type="number"
              min="1"
              required
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição *
            </label>
            <textarea
              required
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 h-32"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Criar Workshop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}