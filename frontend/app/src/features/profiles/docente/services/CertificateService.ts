const API_URL = "http://localhost:3333";
const TOKEN_KEY = "authToken";


interface CertificateResponse {
  certificate_url: string;
}

interface WorkshopInscrito {
  id_usuario: string;      // Novo campo para o id do usuário
  nome_usuario: string;
  id_workshop: string;
  nome_workshop: string;
  data_workshop: string;
  duracao_workshop: number;
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

export const CertificateService = {
  async emitirCertificado(workshopId: string, userId: string): Promise<CertificateResponse> {
    const endpoint = "/volunteers/certificate";
  
    const requestBody = {
      user_id: userId,
      workshop_id: workshopId,
    };
  
    const response = await fetchApi(endpoint, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
  
    // Se a rota não existe ou retornar erro, fetchApi lançará uma exceção.
    const text = await response.text();
    console.log("Resposta do servidor:", text);
  
    // Tente dar parse no text somente se tiver certeza que é JSON
    // Se for um JSON de verdade, faça:
    try {
      const data = JSON.parse(text);
      return { certificate_url: data.certificate_url };
    } catch (err) {
      throw new Error("Não foi possível parsear a resposta como JSON. Resposta: " + text);
    }
  }
  ,

  async listarCertificados(): Promise<WorkshopInscrito[]> {

    const queryRequest: QueryRequest = {
      query:
        "SELECT users.id AS id_usuario, users.name AS nome_usuario, workshops.id AS id_workshop, workshops.title AS nome_workshop, workshops.date AS data_workshop, workshops.duration AS duracao_workshop FROM users JOIN volunteers ON users.id = volunteers.user_id JOIN workshops ON volunteers.workshop_id = workshops.id;",
    };

    const response = await fetchApi("/queries/execute-query", {
      method: "POST",
      body: JSON.stringify(queryRequest),
    });

    return await response.json();
  },
};
