import { v4 as uuidv4 } from 'uuid';

import { User } from '../../../users/entities/User';
import { Workshop } from '../../../workshops/entities/Workshop';
import { ICreateVolunteerDTO } from '../../dtos/ICreateVolunteerDTO';
import { Volunteer } from '../../entities/Volunteer';
import { IVolunteersRepository } from '../IVolunteersRepository';

export class FakeVolunteersRepository implements IVolunteersRepository {
  private volunteers: Volunteer[] = [];

  async create(data: ICreateVolunteerDTO): Promise<Volunteer> {
    const volunteer = new Volunteer();

    Object.assign(volunteer, {
      id: uuidv4(),
      user: Object.assign(new User(), { id: data.user_id }), // Criando um objeto User
      workshop: Object.assign(new Workshop(), { id: data.workshop_id }), // Criando um objeto Workshop
    });

    this.volunteers.push(volunteer);

    return volunteer;
  }

  async findById(id: string): Promise<Volunteer | undefined> {
    return this.volunteers.find((volunteer) => volunteer.id === id);
  }

  async list(): Promise<Volunteer[]> {
    return this.volunteers;
  }

  async delete(id: string): Promise<void> {
    const volunteerIndex = this.volunteers.findIndex(
      (volunteer) => volunteer.id === id
    );

    if (volunteerIndex === -1) {
      throw new Error('Volunteer not found');
    }

    this.volunteers.splice(volunteerIndex, 1);
  }

  async update(data: ICreateVolunteerDTO): Promise<Volunteer> {
    const volunteerIndex = this.volunteers.findIndex((v) => v.id === data.id);

    if (volunteerIndex === -1) {
      throw new Error('Volunteer not found');
    }

    const updatedVolunteer = {
      ...this.volunteers[volunteerIndex],
      user: Object.assign(new User(), { id: data.user_id }), // Criando um objeto User
      workshop: Object.assign(new Workshop(), { id: data.workshop_id }), // Criando um objeto Workshop
    };

    this.volunteers[volunteerIndex] = updatedVolunteer;

    return updatedVolunteer;
  }

  async findByUserAndWorkshop(
    user_id: string,
    workshop_id: string
  ): Promise<Volunteer | undefined> {
    console.log('Buscando voluntário:', { user_id, workshop_id });
    console.log('Lista de voluntários:', this.volunteers);

    return this.volunteers.find(
      (v) => v.user.id === user_id && v.workshop.id === workshop_id
    );
  }
}
