import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  list(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByRA(RA: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUsersRepository };
