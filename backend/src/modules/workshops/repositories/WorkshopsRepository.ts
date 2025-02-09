import { getRepository, Repository } from 'typeorm';

import { AppError } from '../../../errors/AppError';
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

  async list(): Promise<Workshop[]> {
    const workshops = await this.repository.find();

    return workshops;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(data: ICreateWorkshopDTO): Promise<Workshop> {
    const { id, title, description, date, duration } = data;

    let workshop = await this.repository.findOne({ where: { id } });

    if (!workshop) {
      throw new AppError('Workshop não encontrado!', 404);
    }

    workshop = this.repository.create({
      id,
      title,
      description,
      date,
      duration,
    });

    await this.repository.save(workshop);

    return workshop;
  }
}

export { WorkshopsRepository };
