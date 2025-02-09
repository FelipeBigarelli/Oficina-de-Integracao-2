import { inject, injectable } from 'tsyringe';

import { ICreateWorkshopDTO } from '../dtos/ICreateWorkshopDTO';
import { Workshop } from '../entities/Workshop';
import { IWorkshopsRepository } from '../repositories/IWorkshopsRepository';

@injectable()
class CreateWorkshopUseCase {
  constructor(
    @inject('WorkshopsRepository')
    private workshopRepository: IWorkshopsRepository
  ) {}

  async execute({
    title,
    description,
    date,
    duration,
  }: ICreateWorkshopDTO): Promise<Workshop> {
    const workshop = await this.workshopRepository.create({
      title,
      description,
      date,
      duration,
    });

    return workshop;
  }
}

export { CreateWorkshopUseCase };
