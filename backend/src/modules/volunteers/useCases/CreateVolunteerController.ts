import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateVolunteerUseCase } from './CreateVolunteerUseCase';

class CreateVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createVolunteersUseCase = container.resolve(CreateVolunteerUseCase);

    const volunteer = await createVolunteersUseCase.execute({
      user_id,
      start_date: new Date(),
      end_date: null,
      status: true,
      certificate_url: null,
    });

    return response.status(201).json(volunteer);
  }
}

export { CreateVolunteerController };
