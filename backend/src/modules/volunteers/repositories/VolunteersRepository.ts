import { getRepository, Repository } from 'typeorm';

import { User } from '../../users/entities/User';
import { Workshop } from '../../workshops/entities/Workshop';
import { ICreateVolunteerDTO } from '../dtos/ICreateVolunteerDTO';
import { Volunteer } from '../entities/Volunteer';
import { IVolunteersRepository } from './IVolunteersRepository';

class VolunteersRepository implements IVolunteersRepository {
  private repository: Repository<Volunteer>;

  constructor() {
    this.repository = getRepository(Volunteer);
  }

  async create({
    user_id,
    workshop_id,
  }: ICreateVolunteerDTO): Promise<Volunteer> {
    const user = await getRepository(User).findOne({ where: { id: user_id } });
    const workshop = await getRepository(Workshop).findOne({
      where: { id: workshop_id },
    });

    if (!user || !workshop) {
      throw new Error('Usuário ou Workshop não encontrado!');
    }

    const volunteer = this.repository.create({ user, workshop });

    await this.repository.save(volunteer);

    return volunteer;
  }

  async findByUserAndWorkshop(
    user_id: string,
    workshop_id: string
  ): Promise<Volunteer | undefined> {
    return this.repository.findOne({
      where: {
        user: { id: user_id },
        workshop: { id: workshop_id },
      },
      relations: ['user', 'workshop'],
    });
  }
}

export { VolunteersRepository };
