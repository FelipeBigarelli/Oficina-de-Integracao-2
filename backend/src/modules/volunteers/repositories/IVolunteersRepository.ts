import { ICreateVolunteerDTO } from '../dtos/ICreateVolunteerDTO';
import { Volunteer } from '../entities/Volunteer';

interface IVolunteersRepository {
  create(data: ICreateVolunteerDTO): Promise<Volunteer>;
  findByUserAndWorkshop(
    user_id: string,
    workshop_id: string
  ): Promise<Volunteer>;
}

export { IVolunteersRepository };
