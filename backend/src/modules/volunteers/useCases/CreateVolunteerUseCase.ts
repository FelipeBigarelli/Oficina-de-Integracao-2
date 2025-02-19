import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { Volunteer } from '../entities/Volunteer';
import { IVolunteersRepository } from '../repositories/IVolunteersRepository';

interface IRequest {
  user_id: string;
  workshop_id: string;
}

@injectable()
class CreateVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute({ user_id, workshop_id }: IRequest): Promise<Volunteer> {
    const alreadyVolunteer =
      await this.volunteersRepository.findByUserAndWorkshop(
        user_id,
        workshop_id
      );

    if (alreadyVolunteer) {
      throw new AppError('Usuário já é voluntário neste workshop.', 409);
    }

    const volunteer = await this.volunteersRepository.create({
      user_id,
      workshop_id,
    });

    return volunteer;
  }
}

export { CreateVolunteerUseCase };
