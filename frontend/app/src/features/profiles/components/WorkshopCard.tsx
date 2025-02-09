import { CalendarIcon, ClockIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

interface WorkshopCardProps {
  title: string;
  date: string;
  duration: string;
  description: string;
  spotsText: string;
  variant: 'docente' | 'voluntario';
  onEdit?: () => void;
  onDelete?: () => void;
  onSubscribe?: () => void;
}

export function WorkshopCard({
  title,
  date,
  duration,
  description,
  spotsText,
  variant,
  onEdit,
  onDelete,
  onSubscribe,
}: WorkshopCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>

        {/* Seção de informações com ícones - igual para ambas as variantes */}
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <CalendarIcon className="w-5 h-5" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <ClockIcon className="w-5 h-5" />
          <span>{duration}</span>
        </div>

        <p className="text-gray-300">{description}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-green-400 font-medium">{spotsText}</span>

        {variant === 'docente' ? (
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-500"
              title="Editar"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-500"
              title="Excluir"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onSubscribe}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Inscrever-se
          </button>
        )}
      </div>
    </div>
  );
}