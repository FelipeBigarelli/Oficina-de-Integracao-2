import { ICreateVolunteerDTO } from '../dtos/ICreateVolunteerDTO';
import { Volunteer } from '../entities/Volunteer';

interface IVolunteersRepository {
  create(data: ICreateVolunteerDTO): Promise<Volunteer>;
  findById(id: string): Promise<Volunteer>;
}

export { IVolunteersRepository };
