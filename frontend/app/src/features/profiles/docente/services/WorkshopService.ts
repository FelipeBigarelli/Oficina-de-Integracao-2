// DocenteServices.ts
const API_URL = "http://localhost:3333";
const TOKEN_KEY = "authToken";

export interface Workshop {
  id: number;
  title: string;
  date: string;       // Espera formato "DD/MM/YYYY"
  duration: number;   // Em minutos (convertido de string para number)
  description: string;
  participants: number;
}

interface WorkshopRequest {
  title: string;
  description: string;
  date: string;
  duration: string;
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

// Função para converter datas
const formatDateToDDMMYYYY = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getFullYear()}`;
};

export const WorkshopService = {
  async create(workshopData: Omit<Workshop, 'id'>): Promise<Workshop> {
    const requestBody: WorkshopRequest = {
      title: workshopData.title,
      description: workshopData.description,
      date: formatDateToDDMMYYYY(workshopData.date),
      duration: workshopData.duration.toString()
    };

    const response = await fetchApi('/workshops/create', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    
    return await response.json();
  },

  async getAll(): Promise<Workshop[]> {
    const response = await fetchApi('/workshops');
    const data = await response.json();
    
    return data.map((workshop: any) => ({
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      date: new Date(workshop.date).toISOString(), // Convertendo para Date ISO
      duration: parseInt(workshop.duration, 10),   // Convertendo para número
      participants: workshop.participants || 0
    }));
  },

  async update(id: number, workshopData: Partial<Workshop>): Promise<Workshop> {
    const requestBody: Partial<WorkshopRequest> = {};
    
    if (workshopData.title) requestBody.title = workshopData.title;
    if (workshopData.description) requestBody.description = workshopData.description;
    if (workshopData.date) requestBody.date = formatDateToDDMMYYYY(workshopData.date);
    if (workshopData.duration) requestBody.duration = workshopData.duration.toString();

    const response = await fetchApi(`/workshops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
    });
    
    return await response.json();
  },

  async delete(id: number): Promise<void> {
    await fetchApi(`/workshops/${id}`, {
      method: 'DELETE',
    });
  },
};