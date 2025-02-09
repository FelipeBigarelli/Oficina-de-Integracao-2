import { injectable } from 'tsyringe';
import { getConnectionManager } from 'typeorm';

import { AppError } from '../../../errors/AppError';

@injectable()
class ExecuteCustomQueryUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(query: string): Promise<any> {
    if (!query.toLowerCase().startsWith('select')) {
      throw new AppError('Apenas consultas SELECT são permitidas.', 403);
    }

    try {
      const connectionManager = getConnectionManager();

      if (!connectionManager.has('default')) {
        throw new AppError('Banco de dados não conectado.', 500);
      }

      const connection = connectionManager.get('default');
      const result = await connection.query(query);

      return result;
    } catch (error) {
      throw new AppError(
        `Erro ao executar query: ${(error as Error).message}`,
        500
      );
    }
  }
}

export { ExecuteCustomQueryUseCase };
