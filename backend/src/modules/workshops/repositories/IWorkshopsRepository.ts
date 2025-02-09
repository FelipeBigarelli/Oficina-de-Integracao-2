import { ICreateWorkshopDTO } from '../dtos/ICreateWorkshopDTO';
import { Workshop } from '../entities/Workshop';

interface IWorkshopsRepository {
  create(data: ICreateWorkshopDTO): Promise<Workshop>;
  list(): Promise<Workshop[]>;
  findById(id: string): Promise<Workshop>;
  delete(id: string): Promise<void>;
  update(data: ICreateWorkshopDTO): Promise<Workshop>;
}

export { IWorkshopsRepository };
