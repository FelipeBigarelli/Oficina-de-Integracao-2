// AlunoService.test.ts
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { AlunoService } from "../services/AlunoService";

// Mock do fetch global com tipagem correta
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("AlunoService", () => {
  beforeEach(() => {
    // Resetar os mocks antes de cada teste
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("getAll", () => {
    it("deve retornar uma lista de alunos", async () => {
      // Mock do token
      localStorage.setItem("authToken", "fake-token");

      // Mock da resposta da API
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => [
            {
              id: 1,
              name: "João Silva",
              RA: "123456",
              email: "joao.silva@example.com",
              is_admin: false,
              created_at: "2022-01-01T00:00:00Z",
            },
            {
              id: 2,
              name: "Maria Oliveira",
              RA: "789012",
              email: "maria.oliveira@example.com",
              is_admin: false,
              created_at: "2022-01-02T00:00:00Z",
            },
          ],
        })
      );

      const result = await AlunoService.getAll();

      // Verifica se o fetch foi chamado corretamente
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:3333/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fake-token",
        },
      });

      // Verifica o retorno
      // Verifica o retorno
      expect(result).toEqual([
        {
          id: 1,
          nome: "João Silva",
          ra: "123456",
          email: "joao.silva@example.com",
          is_admin: false,
          created_at: "2022-01-01T00:00:00Z",
        },
        {
          id: 2,
          nome: "Maria Oliveira",
          ra: "789012",
          email: "maria.oliveira@example.com",
          is_admin: false,
          created_at: "2022-01-02T00:00:00Z",
        },
      ]);
    });
  });
});
