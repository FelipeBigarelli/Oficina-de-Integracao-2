interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface User {
  RA: string;
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}

// Constantes
const API_URL = "http://localhost:3333";
const TOKEN_KEY = "authToken";
const USER_KEY = "user";

// Utilitário para requisições autenticadas
export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const token = storage.getToken();

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Se recebemos um 401, limpa o storage e redireciona para login
    if (response.status === 401) {
      storage.clear();
      window.location.href = "/auth";
      throw new Error("Sessão expirada");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro na requisição");
    }

    return response;
  },
};

// Gerenciamento do storage
const storage = {
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

};

export async function signUp(userData: Record<string, string>): Promise<void> {
  await api.fetch("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await api.fetch("/sessions", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  storage.setToken(data.token);
  storage.setUser(data.user);

  return data;
}

export function logout(): void {
  storage.clear();
  window.location.href = "/auth";
}

export function isAuthenticated(): boolean {
  return !!storage.getToken() && !!storage.getUser();
}

export function getUser(): User | null {
  return storage.getUser();
}

export function getUserId(): string | null {
  const user = getUser();
  return user ? user.id : null;
}

export function getToken(): string | null {
  return storage.getToken();
}
