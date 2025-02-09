import { v4 as uuidv4 } from 'uuid';

import { ICreateWorkshopDTO } from '../../dtos/ICreateWorkshopDTO';
import { Workshop } from '../../entities/Workshop';
import { IWorkshopsRepository } from '../IWorkshopsRepository';

export class FakeWorkshopsRepository implements IWorkshopsRepository {
  private workshops: Workshop[] = [];

  async create(data: ICreateWorkshopDTO): Promise<Workshop> {
    const workshop = new Workshop();

    Object.assign(workshop, { id: uuidv4(), ...data });

    this.workshops.push(workshop);

    return workshop;
  }

  async findById(id: string): Promise<Workshop | undefined> {
    return this.workshops.find((workshop) => workshop.id === id);
  }

  async list(): Promise<Workshop[]> {
    return this.workshops;
  }

  async delete(id: string): Promise<void> {
    const workshopIndex = this.workshops.findIndex(
      (workshop) => workshop.id === id
    );

    if (workshopIndex === -1) {
      throw new Error('Workshop not found');
    }

    this.workshops.splice(workshopIndex, 1);
  }

  async update(data: ICreateWorkshopDTO): Promise<Workshop> {
    const workshopIndex = this.workshops.findIndex((w) => w.id === data.id);

    if (workshopIndex === -1) {
      throw new Error('Workshop not found');
    }

    const updatedWorkshop = { ...this.workshops[workshopIndex], ...data };

    this.workshops[workshopIndex] = updatedWorkshop;

    return updatedWorkshop;
  }
}
