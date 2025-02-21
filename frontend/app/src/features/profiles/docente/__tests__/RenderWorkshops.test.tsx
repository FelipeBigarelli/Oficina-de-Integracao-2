import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { useWorkshops } from '../hooks/useWorkshops';
import { DocenteWorkshops } from '../pages/DocenteWorkshops';

jest.mock('../hooks/useWorkshops'); // Mock do hook

describe('DocenteWorkshops', () => {
  it('deve renderizar a lista de workshops corretamente', async () => {
    (useWorkshops as jest.Mock).mockReturnValue({
      workshops: [
        { id: 1, title: 'Workshop 1', description: 'Descrição 1', date: '2025-02-20' },
        { id: 2, title: 'Workshop 2', description: 'Descrição 2', date: '2025-02-21' },
      ],
      error: '', // Se houver essa prop
      // handleDelete, handleCreateSuccess, etc. (dependendo do que o hook retorna)
    });

    const { container } = render(<DocenteWorkshops />);

    // Jeito 1: Verificar diretamente com textContent
    const workshop1 = screen.getByText('Workshop 1');
    expect(workshop1).not.toBeNull(); 
    expect(workshop1.textContent).toBe('Workshop 1');

    const workshop2 = screen.getByText('Workshop 2');
    expect(workshop2).not.toBeNull();
    expect(workshop2.textContent).toBe('Workshop 2');

    // Jeito 2: Verificar via container.innerHTML
    expect(container.innerHTML).toContain('Descrição 1');
    expect(container.innerHTML).toContain('Descrição 2');
  });
});
