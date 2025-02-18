// services/VoluntarioService.ts
const API_URL = "http://localhost:3333";
const TOKEN_KEY = "authToken";


interface InscricaoRequest {
  workshop_id: string;
}

interface QueryRequest {
  query: string;
}

const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  // Log para debug
  console.log('Request Headers:', headers);
  console.log('Request Body:', options.body);
  console.log('Endpoint:', `${API_URL}${endpoint}`);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Log para debug
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    const error = await response.json();
    console.log('Error response:', error);
    throw new Error(error.message || "Erro na requisição");
  }

  return response;
};

export const VoluntarioService = {
  async inscrever(workshopId: string): Promise<void> {
    const requestBody: InscricaoRequest = {
      workshop_id: workshopId,
    };

    await fetchApi('/volunteers/create', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }
};