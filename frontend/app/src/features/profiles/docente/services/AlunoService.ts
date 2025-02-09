const API_URL = "http://localhost:3333";
const TOKEN_KEY = "authToken";

export interface Aluno {
   id: string;
   nome: string;
   ra: string;
   email: string;
   is_admin: boolean;
   created_at: string;
}

const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
 const token = localStorage.getItem(TOKEN_KEY);
 
 const headers = {
   "Content-Type": "application/json",
   ...(token ? { Authorization: `Bearer ${token}` } : {}),
   ...options.headers,
 };

 const response = await fetch(`${API_URL}${endpoint}`, {
   ...options,
   headers,
 });

 if (!response.ok) {
   const error = await response.json();
   throw new Error(error.message || "Erro na requisição");
 }

 return response;
};

export const AlunoService = {
 async getAll(): Promise<Aluno[]> {
   const response = await fetchApi('/users');
   const data = await response.json();
   
   return data.map((user: any) => ({
     id: user.id,
     nome: user.name,
     ra: user.RA,
     email: user.email,
     is_admin: user.is_admin,
     created_at: user.created_at,
   }));
 },
};