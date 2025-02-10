import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    email,
    RA,
    password,
    id,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    const isAdmin = RA.startsWith('p');

    Object.assign(user, {
      id: id || uuid(),
      name,
      email,
      RA,
      password,
      is_admin: isAdmin,
    });

    console.log(user.id);

    this.users.push(user);

    return user;
  }

  async findByRA(RA: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.RA === RA);

    return findUser;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }
}

export default FakeUsersRepository;
