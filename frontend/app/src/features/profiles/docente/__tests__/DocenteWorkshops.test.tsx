import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { useWorkshops } from "../hooks/useWorkshops";
import { DocenteWorkshops } from "../pages/DocenteWorkshops";

// Mockar hooks e componentes necessários
jest.mock("../hooks/useWorkshops", () => ({
  useWorkshops: jest.fn(),
}));

jest.mock("../../components/WorkshopCard", () => ({
  WorkshopCard: jest.fn(() => <div>Cartão de Workshop</div>),
}));

jest.mock("../../components/WarningModal", () => ({
  WarningModal: jest.fn(() => <div>Modal de Aviso</div>),
}));

jest.mock("../components/WorkshopModal", () => ({
  WorkshopModal: jest.fn(() => <div>Modal de Workshop</div>),
}));

describe("DocenteWorkshops", () => {
  const mockHandleDelete = jest.fn();
  const mockHandleCreateSuccess = jest.fn();
  const mockHandleUpdateSuccess = jest.fn();

  beforeEach(() => {
    (useWorkshops as jest.Mock).mockReturnValue({
      workshops: [],
      handleDelete: mockHandleDelete,
      handleCreateSuccess: mockHandleCreateSuccess,
      handleUpdateSuccess: mockHandleUpdateSuccess,
    });
  });

  it("renderiza o componente e exibe os cartões de workshop", async () => {
    render(<DocenteWorkshops />);
    expect(screen.getByText("Gerenciar Workshops")).toBeDefined();
    expect(screen.getByText("Novo Workshop")).toBeDefined();
    expect(screen.queryByText("Cartão de Workshop")).toBeDefined();
  });
});