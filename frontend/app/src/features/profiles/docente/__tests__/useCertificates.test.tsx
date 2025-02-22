import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useCertificates } from "../hooks/useCertificates";
import { CertificateService } from "../services/CertificateService";

// Mock do CertificateService com tipagem simplificada
jest.mock("../services/CertificateService", () => ({
  CertificateService: {
    listarCertificados: jest.fn<() => Promise<Array<{
      id_workshop: string;
      id_usuario: string;
      nome_usuario: string;
      nome_workshop: string;
      data_workshop: string;
      duracao_workshop: number;
    }>>>(),
    emitirCertificado: jest.fn<(_w: string, _u: string) => Promise<{ certificate_url: string }>>()
  }
}));

describe("useCertificates", () => {
  const mockListarCertificados = CertificateService.listarCertificados as jest.Mock;
  const mockEmitirCertificado = CertificateService.emitirCertificado as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("busca certificados corretamente", async () => {
    // Configurar mock com data UTC
    const mockData = [{
      id_workshop: "1",
      id_usuario: "1",
      nome_usuario: "Aluno 1",
      nome_workshop: "Workshop 1",
      data_workshop: "2025-02-20T00:00:00.000Z", // Formato ISO com timezone
      duracao_workshop: 60,
    }];

    mockListarCertificados.mockResolvedValue(mockData as never);

    const { result } = renderHook(() => useCertificates());

    // Esperar a resolução da Promise
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verificar a conversão da data
    expect(result.current.certificados).toEqual([{
      workshopId: "1",
      userId: "1",
      aluno: "Aluno 1",
      workshop: "Workshop 1",
      data: "20/02/2025", // Formato esperado com UTC
      duracao: 60,
    }]);
  });

  it("emite um certificado corretamente", async () => {
    const mockResponse = { certificate_url: "http://localhost:3333/certificate/123" };
    mockEmitirCertificado.mockResolvedValue(mockResponse as never);

    const { result } = renderHook(() => useCertificates());

    await act(async () => {
      await result.current.emitirCertificado("1", "1");
    });

    expect(result.current.modalIsOpen).toBe(true);
    expect(result.current.modalMessage).toMatch(/sucesso/);
  });

  it("fecha o modal e abre o link do certificado", async () => {
    const mockUrl = "https://example.com/certificate";
    mockEmitirCertificado.mockResolvedValue({ certificate_url: mockUrl } as never);

    const { result } = renderHook(() => useCertificates());

    await act(async () => {
      await result.current.emitirCertificado("1", "1");
    });

    const windowOpenSpy = jest.spyOn(window, "open").mockImplementation(() => null);

    await act(async () => {
      result.current.closeModal();
    });

    expect(windowOpenSpy).toHaveBeenCalledWith(mockUrl, "_blank");
    windowOpenSpy.mockRestore();
  });
});