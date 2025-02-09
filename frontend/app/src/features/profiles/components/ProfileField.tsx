interface ProfileFieldProps {
    label: string;
    value?: string;
  }
  
  export function ProfileField ({ label, value }: ProfileFieldProps){
    return (
      <div className="border-b border-gray-700 pb-4">
        <dt className="text-sm font-medium text-gray-400">{label}</dt>
        <dd className="mt-1 text-lg text-white">{value || 'Não informado'}</dd>
      </div>
    );
  };