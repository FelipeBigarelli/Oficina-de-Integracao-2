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
    const workshop = await this.workshopsRepository.findById(id);

    if (!workshop) {
      throw new AppError('Workshop não existe ou não foi encontrado', 404);
    }

    await this.workshopsRepository.delete(id);
  }
}

export { DeleteWorkshopUseCase };
