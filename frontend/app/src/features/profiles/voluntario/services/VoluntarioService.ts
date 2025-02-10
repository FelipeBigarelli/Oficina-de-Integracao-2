// services/VoluntarioService.ts
const API_URL = "http://localhost:3333";
const TOKEN_KEY = "authToken";

import { getUserId } from "../../../auth/services/Authentication";

interface InscricaoRequest {
  workshop_id: string;
}

interface QueryRequest {
  query: string;
}

interface WorkshopInscrito {
  nome_usuario: string;
  id_workshop: string;
  nome_workshop: string;
  data_workshop: string;
  duracao_workshop: number;
}

interface CertificateResponse {
    certificate_url: string;
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
  },

  async listarWorkshopsInscritos(): Promise<WorkshopInscrito[]> {

    const id = getUserId();

    const queryRequest: QueryRequest = {
      query: "SELECT users.id AS id_usuario, users.name AS nome_usuario, workshops.id AS id_workshop, workshops.title AS nome_workshop, workshops.date AS data_workshop, workshops.duration AS duracao_workshop FROM users JOIN volunteers ON users.id = volunteers.user_id JOIN workshops ON volunteers.workshop_id = workshops.id WHERE users.id = '" + id + "';",
    };
    
    const response = await fetchApi('/queries/execute-query', {
      method: 'POST',
      body: JSON.stringify(queryRequest),
    });
  
    return await response.json();
  },async emitirCertificado(workshopId: string): Promise<CertificateResponse> {
    const endpoint = `/volunteers/certificate?workshop_id=${workshopId}`;
  
    const response = await fetchApi(endpoint, {
      method: 'GET',
    });
  
    // Parse the response as text, not JSON
    const result = await response.text();
    console.log('Certificate URL:', result); // Log the certificate URL
  
    // Return the URL as a string
    return { certificate_url: result };
  }
};