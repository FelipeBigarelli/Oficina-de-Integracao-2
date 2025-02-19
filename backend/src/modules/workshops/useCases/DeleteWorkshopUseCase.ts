import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IWorkshopsRepository } from '../repositories/IWorkshopsRepository';

@injectable()
class DeleteWorkshopUseCase {
  constructor(
    @inject('WorkshopsRepository')
    private workshopsRepository: IWorkshopsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const workshop = this.workshopsRepository.delete(id);
    if (!workshop) {
      throw new AppError('Workshop não existe ou não foi encontrado', 404);
    }
    return workshop;
  }
}

export { DeleteWorkshopUseCase };
