import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateWorkshopUseCase } from './UpdateWorkshopUseCase';

dayjs.extend(customParseFormat);

class UpdateWorkshopController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description, date, duration } = request.body;

    const listWorkshopsUseCase = container.resolve(UpdateWorkshopUseCase);

    const formattedDate = dayjs(date, 'DD/MM/YYYY', true).toDate();

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(formattedDate.getTime())) {
      return response
        .status(400)
        .json({ error: 'Data inválida! Use o formato DD/MM/YYYY.' });
    }

    const workshop = await listWorkshopsUseCase.execute({
      id,
      title,
      description,
      date: formattedDate,
      duration,
    });

    return response.status(201).json(workshop);
  }
}

export { UpdateWorkshopController };
