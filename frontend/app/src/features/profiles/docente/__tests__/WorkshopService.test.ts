// WorkshopService.test.ts
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { WorkshopService } from "../services/WorkshopService";

// Mock do fetch global com tipagem correta
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("WorkshopService", () => {
  beforeEach(() => {
    // Resetar os mocks antes de cada teste
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("create", () => {
    it("deve enviar dados formatados corretamente para a API", async () => {
      // Mock do token
      localStorage.setItem("authToken", "fake-token");

      // Mock da resposta da API
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({
            id: 1,
            title: "Workshop de React",
            date: "01/01/2023",
            duration: 120,
            description: "Descrição",
          }),
        })
      );

      const workshopData = {
        title: "Workshop de React",
        date: "2023-01-01T00:00:00Z",
        duration: 120,
        description: "Descrição",
      };

      const result = await WorkshopService.create(workshopData);

      // Verifica se o fetch foi chamado corretamente
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3333/workshops/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fake-token",
          },
          body: JSON.stringify({
            title: "Workshop de React",
            description: "Descrição",
            date: "31/12/2022",
            duration: "120",
          }),
        }
      );

      // Verifica o retorno
      expect(result).toEqual({
        id: 1,
        title: "Workshop de React",
        date: "01/01/2023",
        duration: 120,
        description: "Descrição",
      });
    });
  });

  describe("getAll", () => {
    it("deve retornar uma lista de workshops", async () => {
      // Mock do token
      localStorage.setItem("authToken", "fake-token");

      // Mock da resposta da API
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => [
            {
              id: 1,
              title: "Workshop de React",
              date: "2023-01-01T00:00:00Z",
              duration: "120",
              description: "Descrição",
            },
            {
              id: 2,
              title: "Workshop de Node.js",
              date: "2023-01-02T00:00:00Z",
              duration: "180",
              description: "Descrição",
            },
          ],
        })
      );

      const result = await WorkshopService.getAll();

      // Verifica se o fetch foi chamado corretamente
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3333/workshops",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fake-token",
          },
        }
      );

      // Verifica o retorno
      expect(result).toEqual([
        {
          id: 1,
          title: "Workshop de React",
          description: "Descrição",
          date: "2023-01-01T00:00:00.000Z",
          duration: 120,
        },
        {
          id: 2,
          title: "Workshop de Node.js",
          description: "Descrição",
          date: "2023-01-02T00:00:00.000Z",
          duration: 180,
        },
      ]);
    });
  });

  describe("update", () => {
    it("deve enviar dados formatados corretamente para a API", async () => {
      // Mock do token
      localStorage.setItem("authToken", "fake-token");

      // Mock da resposta da API
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({
            id: 1,
            title: "Workshop de React atualizado",
            date: "01/01/2023",
            duration: 120,
            description: "Descrição atualizada",
          }),
        })
      );

      const workshopData = {
        title: "Workshop de React atualizado",
        date: "2023-01-01T00:00:00Z",
        duration: 120,
        description: "Descrição atualizada",
      };

      const result = await WorkshopService.update("1", workshopData);

      // Verifica se o fetch foi chamado corretamente
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3333/workshops/edit/1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fake-token",
          },
          body: JSON.stringify({
            title: "Workshop de React atualizado",
            description: "Descrição atualizada",
            date: "31/12/2022",
            duration: "120",
          }),
        }
      );

      // Verifica o retorno
      expect(result).toEqual({
        id: 1,
        title: "Workshop de React atualizado",
        date: "01/01/2023",
        duration: 120,
        description: "Descrição atualizada",
      });
    });
  });

  describe("delete", () => {
    it("deve enviar requisição de exclusão para a API", async () => {
      // Mock do token
      localStorage.setItem("authToken", "fake-token");

      // Mock da resposta da API
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
        })
      );

      await WorkshopService.delete(1);

      // Verifica se o fetch foi chamado corretamente
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3333/workshops/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fake-token",
          },
          body: JSON.stringify({
            workshop_id: 1,
          }),
        }
      );
    });
  });
});
