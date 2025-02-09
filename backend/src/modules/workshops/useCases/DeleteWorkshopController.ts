import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteWorkshopUseCase } from './DeleteWorkshopUseCase';

class DeleteWorkshopController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { workshop_id } = request.body;

    const listWorkshopsUseCase = container.resolve(DeleteWorkshopUseCase);

    await listWorkshopsUseCase.execute(workshop_id);

    return response.status(200).json('Workshop removido com sucesso');
  }
}

export { DeleteWorkshopController };
