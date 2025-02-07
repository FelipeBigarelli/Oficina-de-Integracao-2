import { getRepository, Repository } from 'typeorm';

import { ICreateVolunteerDTO } from '../dtos/ICreateVolunteerDTO';
import { Volunteer } from '../entities/Volunteer';
import { IVolunteersRepository } from './IVolunteersRepository';

class VolunteersRepository implements IVolunteersRepository {
  private repository: Repository<Volunteer>;

  constructor() {
    this.repository = getRepository(Volunteer);
  }

  async create({
    id,
    name,
    RA,
    start_date,
    end_date,
    status,
    certificate_url,
    user_id,
  }: ICreateVolunteerDTO): Promise<Volunteer> {
    const volunteer = this.repository.create({
      id,
      name,
      RA,
      start_date,
      end_date,
      status,
      certificate_url,
      user_id,
    });

    await this.repository.save(volunteer);

    return volunteer;
  }
}

export { VolunteersRepository };
