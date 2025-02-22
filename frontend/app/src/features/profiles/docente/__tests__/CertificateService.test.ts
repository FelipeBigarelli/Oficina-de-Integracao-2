// CertificateService.test.ts
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { CertificateService } from "../services/CertificateService";

// Mock do fetch global com tipagem correta
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

// Interface necessária para os testes
interface WorkshopInscrito {
  id_usuario: string;
  nome_usuario: string;
  id_workshop: string;
  nome_workshop: string;
  data_workshop: string;
  duracao_workshop: number;
}

describe("CertificateService", () => {
  const API_URL = "http://localhost:3333";
  const mockToken = "fake-token";

  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    localStorage.setItem("authToken", mockToken);
  });

  describe("emitirCertificado", () => {
    it("deve emitir certificado corretamente", async () => {
      const mockResponse = {
        certificate_url: "http://localhost:3333/certificates/1.pdf",
      };

      // Mock corrigido com tipagem explícita
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(JSON.stringify(mockResponse)),
        })
      );

      const result = await CertificateService.emitirCertificado(
        "workshop123",
        "user456"
      );

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/volunteers/certificate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mockToken}`,
          },
          body: JSON.stringify({
            user_id: "user456",
            workshop_id: "workshop123",
          }),
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe("listarCertificados", () => {
    it("deve listar certificados corretamente", async () => {
      const mockData: WorkshopInscrito[] = [
        {
          id_usuario: "user123",
          nome_usuario: "João Silva",
          id_workshop: "workshop456",
          nome_workshop: "Workshop de React",
          data_workshop: "2023-01-01",
          duracao_workshop: 120,
        },
      ];

      // Mock corrigido com tipagem explícita
      (global.fetch as jest.Mock).mockImplementationOnce(() => {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockData),
        });
      });

      const result = await CertificateService.listarCertificados();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/queries/execute-query`,
        expect.objectContaining({
          method: "POST",
          headers: {
            Authorization: "Bearer fake-token",
            "Content-Type": "application/json",
          },
        })
      );

      expect(result).toEqual(mockData);
    });
  });

  describe("Tratamento de erros", () => {
    it("deve lançar erro quando token não existe", async () => {
      localStorage.clear();

      await expect(CertificateService.listarCertificados()).rejects.toThrow(
        "Token de autenticação não encontrado"
      );
    });

    it("deve lançar erro quando resposta não é JSON válido", async () => {
      // Mock corrigido com tipagem explícita
      (global.fetch as jest.Mock).mockImplementationOnce(() => {
        return Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve("invalid-json"),
        });
      });

      await expect(
        CertificateService.emitirCertificado("1", "2")
      ).rejects.toThrow("Não foi possível parsear a resposta como JSON");
    });
  });
});
