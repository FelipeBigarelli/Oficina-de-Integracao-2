import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ExecuteCustomQueryUseCase } from './ExecuteCustomQueryUseCase';

class ExecuteCustomQueryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request.body;

    if (!query) {
      return response.status(400).json({ error: 'A query é obrigatória.' });
    }

    const executeCustomQueryUseCase = container.resolve(
      ExecuteCustomQueryUseCase
    );
    const result = await executeCustomQueryUseCase.execute(query);

    return response.status(200).json(result);
  }
}

export { ExecuteCustomQueryController };
