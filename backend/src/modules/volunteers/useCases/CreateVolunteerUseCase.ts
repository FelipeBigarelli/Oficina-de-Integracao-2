import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IUsersRepository } from '../../users/repositories/IUsersRepository';
import { ICreateVolunteerDTO } from '../dtos/ICreateVolunteerDTO';
import { Volunteer } from '../entities/Volunteer';
import { IVolunteersRepository } from '../repositories/IVolunteersRepository';

@injectable()
class CreateVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    user_id,
    start_date,
    end_date,
    status,
    certificate_url,
  }: ICreateVolunteerDTO): Promise<Volunteer> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { name, RA } = user;

    const volunteer = await this.volunteersRepository.create({
      name,
      RA,
      start_date,
      end_date,
      status,
      certificate_url,
      user_id,
    });

    return volunteer;
  }
}

export { CreateVolunteerUseCase };
