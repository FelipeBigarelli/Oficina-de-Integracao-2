import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateVolunteerUseCase } from './CreateVolunteerUseCase';

class CreateVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, workshop_id } = request.body;

    const createVolunteerUseCase = container.resolve(CreateVolunteerUseCase);

    const volunteer = await createVolunteerUseCase.execute({
      user_id,
      workshop_id,
    });

    return response.status(201).json(volunteer);
  }
}

export { CreateVolunteerController };
