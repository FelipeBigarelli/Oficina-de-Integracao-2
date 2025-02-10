import 'reflect-metadata';
import { getConnectionManager, Connection } from 'typeorm';

import { ExecuteCustomQueryUseCase } from '../useCases/ExecuteCustomQueryUseCase';

jest.mock('typeorm', () => ({
  getConnectionManager: jest.fn(),
}));

describe('ExecuteCustomQueryUseCase', () => {
  let executeCustomQuery: ExecuteCustomQueryUseCase;
  let mockConnection: Partial<Connection>;

  beforeEach(() => {
    executeCustomQuery = new ExecuteCustomQueryUseCase();
    mockConnection = {
      query: jest.fn().mockResolvedValue([{ id: 1, name: 'Teste' }]),
    };

    (getConnectionManager as jest.Mock).mockReturnValue({
      has: jest.fn().mockReturnValue(true),
      get: jest.fn().mockReturnValue(mockConnection),
    });
  });

  it('should execute a valid SELECT query and return results', async () => {
    const result = await executeCustomQuery.execute('SELECT * FROM users');

    expect(mockConnection.query).toHaveBeenCalledWith('SELECT * FROM users');
    expect(result).toEqual([{ id: 1, name: 'Teste' }]);
  });

  it('should throw an error if query is not a SELECT statement', async () => {
    await expect(
      executeCustomQuery.execute('DELETE FROM users WHERE id = 1')
    ).rejects.toMatchObject({
      message: 'Apenas consultas SELECT são permitidas.',
    });
  });

  it('should throw an error if database is not connected', async () => {
    (getConnectionManager as jest.Mock).mockReturnValue({
      has: jest.fn().mockReturnValue(false),
    });

    await expect(
      executeCustomQuery.execute('SELECT * FROM users')
    ).rejects.toMatchObject({
      message: 'Erro ao executar query: Banco de dados não conectado.',
    });
  });

  it('should throw an error if query execution fails', async () => {
    mockConnection.query = jest.fn().mockRejectedValue(new Error('Erro SQL'));

    await expect(
      executeCustomQuery.execute('SELECT * FROM users')
    ).rejects.toMatchObject({
      message: 'Erro ao executar query: Erro SQL',
    });
  });
});
