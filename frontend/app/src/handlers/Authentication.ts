// Tipos (Interfaces)
interface LoginRequest {
    email: string;
    password: string;
  }
  
  interface LoginResponse {
    token: string;
    isDocente: boolean;
  }
  
  // URL base da API
  const API_URL = 'http://localhost:3333';
  
  /**
   * Função para criar uma nova conta
   * @param {Record<string, string>} userData - Dados do usuário para criar a conta
   */
  export async function signUp(userData: Record<string, string>): Promise<void> {
    
    console.log(userData)
    
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar conta');
    }
  }

  /**
   * Função para fazer login
   * @param {LoginRequest} credentials - Credenciais de login (email e senha)
   * @returns {Promise<LoginResponse>} Resposta contendo o token e o tipo de usuário
   */
  export async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro no login');
    }
  
    return response.json();
  }
  
  /**
   * Função para logout
   */
  export function logout(): void {
    localStorage.removeItem('authToken');
  }
  
  /**
   * Função para verificar o status de autenticação
   * @returns {boolean} Indica se o usuário está autenticado
   */
  export function isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true se houver um token armazenado
  }