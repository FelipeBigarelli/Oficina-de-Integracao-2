import { inject, injectable } from 'tsyringe';

import { ICreateWorkshopDTO } from '../dtos/ICreateWorkshopDTO';
import { Workshop } from '../entities/Workshop';
import { IWorkshopsRepository } from '../repositories/IWorkshopsRepository';

@injectable()
class UpdateWorkshopUseCase {
  constructor(
    @inject('WorkshopsRepository')
    private workshopsRepository: IWorkshopsRepository
  ) {}

  async execute({
    id,
    title,
    description,
    date,
    duration,
  }: ICreateWorkshopDTO): Promise<Workshop> {
    const workshop = this.workshopsRepository.update({
      id,
      title,
      description,
      date,
      duration,
    });

    return workshop;
  }
}

export { UpdateWorkshopUseCase };
