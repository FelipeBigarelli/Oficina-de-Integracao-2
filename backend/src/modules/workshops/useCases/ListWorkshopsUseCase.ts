import { inject, injectable } from 'tsyringe';

import { Workshop } from '../entities/Workshop';
import { IWorkshopsRepository } from '../repositories/IWorkshopsRepository';

@injectable()
class ListWorkshopsUseCase {
  constructor(
    @inject('WorkshopsRepository')
    private workshopsRepository: IWorkshopsRepository
  ) {}

  async execute(): Promise<Workshop[]> {
    const workshops = this.workshopsRepository.list();

    return workshops;
  }
}

export { ListWorkshopsUseCase };
