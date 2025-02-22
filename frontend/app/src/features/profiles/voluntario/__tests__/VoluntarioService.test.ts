import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    jest,
} from "@jest/globals";
import { VoluntarioService } from "../services/VoluntarioService";

describe("VoluntarioService", () => {
  beforeEach(() => {
    // Limpar o token de autenticação
    localStorage.removeItem("authToken");
    global.fetch = jest.fn(() => Promise.resolve({} as Response));
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  describe("inscrever", () => {
    it("deve lançar erro quando token de autenticação não existe", async () => {
      await expect(VoluntarioService.inscrever("123")).rejects.toThrowError(
        "Token de autenticação não encontrado"
      );
    });

    it("deve enviar requisição POST para criar inscrição", async () => {
      // Mock do token de autenticação
      localStorage.setItem("authToken", "fake-token");

      // Mock da resposta da API
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ message: "Inscrição criada com sucesso" }),
        })
      );

      await VoluntarioService.inscrever("123");

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3333/volunteers/create",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fake-token",
          },
          body: JSON.stringify({ workshop_id: "123" }),
        })
      );
    });

    it("deve lançar erro quando resposta da API não é OK", async () => {
      // Mock do token de autenticação
      localStorage.setItem("authToken", "fake-token");

      // Mock da resposta da API
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: async () => ({ message: "Erro ao criar inscrição" }),
        })
      );

      await expect(VoluntarioService.inscrever("123")).rejects.toThrowError(
        "Erro ao criar inscrição"
      );
    });
  });
});
