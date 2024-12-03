import React, { useState } from "react";

interface FormProps {
  fields: { name: string; type: string; placeholder: string }[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  title: string;
  buttonLabel: string;
}

export const Form = ({ fields, onSubmit, title, buttonLabel }: FormProps) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = ""; // Inicializa os campos como strings vazias
      return acc;
    }, {} as Record<string, string>)
  );
  const [error, setError] = useState<string | null>(null); // Gerenciamento de erro

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpa mensagens de erro anteriores
  
    // Validação genérica: verificar se todos os campos estão preenchidos
    const emptyField = fields.find((field) => !formData[field.name]);
    if (emptyField) {
      setError("Por favor, preencha todos os campos."); // Mensagem genérica
      return;
    }
  
    try {
      await onSubmit(formData); // Tenta submeter o formulário
    } catch (err: any) {
      const errorMessage = err.message || "Ocorreu um erro inesperado.";
      setError(errorMessage); // Mostra mensagem de erro da submissão
    }
  };

  return (
    <form className="w-full flex flex-col max-w-[450px] mx-auto" onSubmit={handleSubmit}>
      {/* Cabeçalho */}
      <div className="w-full flex flex-col mb-10 text-white">
        <h3 className="text-4x1 font-bold mb-2">{title}</h3>
        <p className="text-lg mb-4">Seja bem-vindo! Preencha os campos abaixo.</p>
      </div>

      {/* Campos de formulário */}
      <div className="w-full flex flex-col mb-4">
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            className={
              `w-full text-white py-2 mb-4 bg-transparent border-b focus:outline-none
              ${
                !formData[field.name] && error ? "border-red-500 animate-pulse" : "border-gray-500 focus:border-white"
              }`
            }
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="w-full text-red-500 text-xs animate-pulse mb-4">
          {error}
        </div>
      )}

      {/* Botão de envio */}
      <div className="w-full flex flex-col mb-4">
        <button
          type="submit"
          className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
};