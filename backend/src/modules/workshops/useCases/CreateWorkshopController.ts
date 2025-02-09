import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateWorkshopUseCase } from './CreateWorkshopUseCase';

dayjs.extend(customParseFormat);

class CreateWorkshopController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, date, duration } = request.body;

    const formattedDate = dayjs(date, 'DD/MM/YYYY', true).toDate();

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(formattedDate.getTime())) {
      return response
        .status(400)
        .json({ error: 'Data inválida! Use o formato DD/MM/YYYY.' });
    }

    const createWorkshopsUseCase = container.resolve(CreateWorkshopUseCase);

    const workshop = await createWorkshopsUseCase.execute({
      title,
      description,
      date: formattedDate,
      duration,
    });

    return response.status(201).json(workshop);
  }
}

export { CreateWorkshopController };
