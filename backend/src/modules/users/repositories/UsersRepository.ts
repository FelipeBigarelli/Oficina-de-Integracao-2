import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from './IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    RA,
    password,
    id,
    is_admin,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      RA,
      password,
      id,
      is_admin,
    });

    await this.repository.save(user);

    return user;
  }

  async findByRA(RA: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ RA });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }
}

export { UsersRepository };
