import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    email,
    RA,
    password,
    id,
    is_admin,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: id || uuid(),
      name,
      email,
      RA,
      password,
      is_admin,
    });

    console.log(user.id);

    this.users.push(user);

    return user;
  }

  async findByRA(RA: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.RA === RA);

    return findUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }
}

export default UsersRepository;
