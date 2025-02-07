import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, RA, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByRA(RA);

    const prefixAdmin = 'p';

    if (userAlreadyExists) {
      throw new AppError('User already exists', 403);
    }

    if (!email || !RA || !password) {
      throw new AppError('Missing fields, check again', 400);
    }

    const isAdmin = RA.startsWith(prefixAdmin);
    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      RA,
      password: passwordHash,
      is_admin: isAdmin,
    });

    return user;
  }
}

export { CreateUserUseCase };
