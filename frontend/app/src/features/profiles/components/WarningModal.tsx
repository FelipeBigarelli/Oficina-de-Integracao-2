import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: "success" | "error";
}

export function WarningModal({ isOpen, onClose, message, type }: WarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <div className="flex flex-col items-center space-y-4">
          {type === "success" ? (
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
          ) : (
            <ExclamationCircleIcon className="w-12 h-12 text-red-500" />
          )}
          
          {/* Dividindo a mensagem por linhas */}
          <div className="text-white text-center">
            {message.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
