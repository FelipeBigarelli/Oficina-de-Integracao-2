import { getRepository, Repository } from 'typeorm';

import { ICreateWorkshopDTO } from '../dtos/ICreateWorkshopDTO';
import { Workshop } from '../entities/Workshop';
import { IWorkshopsRepository } from './IWorkshopsRepository';

class WorkshopsRepository implements IWorkshopsRepository {
  private repository: Repository<Workshop>;

  constructor() {
    this.repository = getRepository(Workshop);
  }

  async create({
    id,
    title,
    description,
    date,
    duration,
  }: ICreateWorkshopDTO): Promise<Workshop> {
    const workshop = this.repository.create({
      id,
      title,
      description,
      date,
      duration,
    });

    await this.repository.save(workshop);

    return workshop;
  }

  async findById(id: string): Promise<Workshop> {
    const workshop = this.repository.findOne(id);

    return workshop;
  }
}

export { WorkshopsRepository };
