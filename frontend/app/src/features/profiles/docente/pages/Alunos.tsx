import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { Aluno, AlunoService } from '../services/AlunoService';

export function Alunos() {
 const [searchTerm, setSearchTerm] = useState('');
 const [alunos, setAlunos] = useState<Aluno[]>([]);
 const [error, setError] = useState('');

 useEffect(() => {
   const loadAlunos = async () => {
     try {
       const data = await AlunoService.getAll();
       const alunosNaoAdmin = data.filter(aluno => !aluno.is_admin);
       setAlunos(alunosNaoAdmin);
     } catch (err) {
       setError('Erro ao carregar alunos');
     }
   };
   
   loadAlunos();
 }, []);

 const filteredAlunos = alunos.filter(aluno =>
   aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
   aluno.ra.includes(searchTerm)
 );

 if (error) return <div className="text-red-500 p-6">{error}</div>;

 return (
   <div className="max-w-6xl mx-auto p-6">
     <div className="flex justify-between items-center mb-8">
       <h1 className="text-4xl font-bold text-white">Listagem de Alunos</h1>
       
       <div className="relative">
         <input
           type="text"
           placeholder="Buscar aluno..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
         <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
       </div>
     </div>

     <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
       <table className="min-w-full">
         <thead className="bg-gray-700">
           <tr>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
               Aluno
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
               RA
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
               Email
             </th>
           </tr>
         </thead>
         <tbody className="divide-y divide-gray-700">
           {filteredAlunos.map((aluno) => (
             <tr key={aluno.id} className="hover:bg-gray-750 transition-colors">
               <td className="px-6 py-4">
                 <div className="flex items-center">
                   <UserCircleIcon className="w-8 h-8 text-gray-400 mr-3" />
                   <span className="text-white">{aluno.nome}</span>
                 </div>
               </td>
               <td className="px-6 py-4 text-gray-300">{aluno.ra}</td>
               <td className="px-6 py-4 text-gray-300">{aluno.email}</td>
             </tr>
           ))}
         </tbody>
       </table>

       {filteredAlunos.length === 0 && (
         <div className="p-6 text-center text-gray-400">
           Nenhum aluno encontrado
         </div>
       )}
     </div>
   </div>
 );
}