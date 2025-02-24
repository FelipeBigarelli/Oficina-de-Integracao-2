// services/VoluntarioService.ts
const API_URL = "http://localhost:3333";
const TOKEN_KEY = "authToken";

interface InscricaoRequest {
  workshop_id: string;
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

export const VoluntarioService = {
  async inscrever(workshopId: string): Promise<void> {
    const requestBody: InscricaoRequest = {
      workshop_id: workshopId,
    };

    await fetchApi("/volunteers/create", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
  },
};
