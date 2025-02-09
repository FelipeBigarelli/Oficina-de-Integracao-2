import { ICreateWorkshopDTO } from '../dtos/ICreateWorkshopDTO';
import { Workshop } from '../entities/Workshop';

interface IWorkshopsRepository {
  create(data: ICreateWorkshopDTO): Promise<Workshop>;
  findById(id: string): Promise<Workshop>;
}

export { IWorkshopsRepository };
