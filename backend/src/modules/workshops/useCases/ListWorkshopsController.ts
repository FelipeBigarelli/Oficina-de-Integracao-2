import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListWorkshopsUseCase } from './ListWorkshopsUseCase';

class ListWorkshopsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listWorkshopsUseCase = container.resolve(ListWorkshopsUseCase);

    const all = await listWorkshopsUseCase.execute();

    return response.json(all);
  }
}

export { ListWorkshopsController };
