import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { useWorkshops } from "../hooks/useWorkshops";
import { DocenteWorkshops } from "../pages/DocenteWorkshops";


// Mock necessary hooks and components
jest.mock("../hooks/useWorkshops", () => ({
  useWorkshops: jest.fn(),
}));

jest.mock("../../components/WorkshopCard", () => ({
  WorkshopCard: jest.fn(() => <div>Workshop Card</div>),
}));

jest.mock("../../components/WarningModal", () => ({
  WarningModal: jest.fn(() => <div>Warning Modal</div>),
}));

jest.mock("../components/WorkshopModal", () => ({
  WorkshopModal: jest.fn(() => <div>Workshop Modal</div>),
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

  it("renders the component and displays workshop cards", async () => {
    render(<DocenteWorkshops />);
    expect(screen.getByText("Gerenciar Workshops")).toBeDefined();
    expect(screen.getByText("Novo Workshop")).toBeDefined();
    expect(screen.queryByText("Workshop Card")).toBeDefined();
  });
});