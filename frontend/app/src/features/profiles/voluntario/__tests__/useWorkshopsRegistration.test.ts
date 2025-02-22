import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';
import { VoluntarioService } from '../services/VoluntarioService';
import { useWorkshopRegistration } from './../hooks/useWorkshopRegistration';

describe('useWorkshopRegistration', () => {
  const workshops = [
    { id: 1, title: 'Workshop 1', date: '2023-03-01T10:00:00.000Z', duration: 2 },
    { id: 2, title: 'Workshop 2', date: '2023-03-02T10:00:00.000Z', duration: 3 },
  ];

  beforeEach(() => {
    jest.spyOn(VoluntarioService, 'inscrever').mockResolvedValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve inicializar com modal fechado', () => {
    const { result } = renderHook(() => useWorkshopRegistration(workshops));
    expect(result.current.warningModal.isOpen).toBe(false);
  });

  it('deve abrir modal com mensagem de sucesso ao realizar inscrição', async () => {
    const { result } = renderHook(() => useWorkshopRegistration(workshops));
    await act(() => result.current.handleRegistration(1));
    expect(result.current.warningModal.isOpen).toBe(true);
    expect(result.current.warningModal.type).toBe('success');
  });

  it('deve abrir modal com mensagem de erro ao realizar inscrição', async () => {
    jest.spyOn(VoluntarioService, 'inscrever').mockRejectedValue(new Error('Erro ao realizar inscrição'));
    const { result } = renderHook(() => useWorkshopRegistration(workshops));
    await act(() => result.current.handleRegistration(1));
    expect(result.current.warningModal.isOpen).toBe(true);
    expect(result.current.warningModal.type).toBe('error');
  });
});