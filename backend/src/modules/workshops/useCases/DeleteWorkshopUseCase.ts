import { inject, injectable } from 'tsyringe';

import { IWorkshopsRepository } from '../repositories/IWorkshopsRepository';

@injectable()
class DeleteWorkshopUseCase {
  constructor(
    @inject('WorkshopsRepository')
    private workshopsRepository: IWorkshopsRepository
  ) {}

  async execute(id: string): Promise<void> {
    return this.workshopsRepository.delete(id);
  }
}

export { DeleteWorkshopUseCase };
