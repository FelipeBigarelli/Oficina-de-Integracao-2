import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from "@testing-library/react";
import { WarningModal } from "../components/WarningModal"; // Ajuste o caminho se necessário


describe("WarningModal Component", () => {
  it("não renderiza quando isOpen é false", () => {
    const { container } = render(
      <WarningModal isOpen={false} onClose={jest.fn()} message="Teste" type="success" />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renderiza corretamente quando isOpen é true", () => {
    render(
      <WarningModal isOpen={true} onClose={jest.fn()} message="Teste de modal" type="success" />
    );
    const modalText = screen.getByText("Teste de modal");
    expect(modalText.textContent).toBe("Teste de modal");
  });

  it("exibe corretamente mensagens com múltiplas linhas", () => {
    const message = "Linha 1\nLinha 2\nLinha 3";
    render(<WarningModal isOpen={true} onClose={jest.fn()} message={message} type="success" />);
    expect(screen.getByText("Linha 1").textContent).toBe("Linha 1");
    expect(screen.getByText("Linha 2").textContent).toBe("Linha 2");
    expect(screen.getByText("Linha 3").textContent).toBe("Linha 3");
  });

  it("exibe o ícone de sucesso corretamente", () => {
    const { container } = render(
      <WarningModal isOpen={true} onClose={jest.fn()} message="Sucesso!" type="success" />
    );
    const svgIcon = container.querySelector("svg");
    expect(svgIcon).toBeTruthy();
    expect(svgIcon?.getAttribute("class")).toContain("text-green-500");
  });

  it("exibe o ícone de erro corretamente", () => {
    const { container } = render(
      <WarningModal isOpen={true} onClose={jest.fn()} message="Erro!" type="error" />
    );
    const svgIcon = container.querySelector("svg");
    expect(svgIcon).toBeTruthy();
    expect(svgIcon?.getAttribute("class")).toContain("text-red-500");
  });

  it("fecha o modal ao clicar no botão OK", () => {
    const onCloseMock = jest.fn();
    render(<WarningModal isOpen={true} onClose={onCloseMock} message="Teste" type="success" />);
    fireEvent.click(screen.getByText("OK"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("fecha o modal ao clicar no botão de fechar (✕)", () => {
    const onCloseMock = jest.fn();
    render(<WarningModal isOpen={true} onClose={onCloseMock} message="Teste" type="success" />);
    fireEvent.click(screen.getByText("✕"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
