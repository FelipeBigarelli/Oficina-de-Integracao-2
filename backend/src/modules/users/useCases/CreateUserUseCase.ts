import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, RA, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByRA(RA);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    if (!email || !RA || !password) {
      throw new Error('Missing fields, check again');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      RA,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
