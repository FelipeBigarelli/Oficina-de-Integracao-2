import { hash } from 'bcrypt';

import { FakeDateProvider } from '../repositories/fakes/FakeDateProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';
import { AuthenticateUserUseCase } from '../useCases/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase';

describe('AuthenticateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeUserTokensRepository: FakeUsersTokensRepository;
  let fakeDateProvider: FakeDateProvider;
  let createUser: CreateUserUseCase;
  let authenticateUser: AuthenticateUserUseCase;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUsersTokensRepository();
    fakeDateProvider = new FakeDateProvider();

    createUser = new CreateUserUseCase(fakeUsersRepository);
    authenticateUser = new AuthenticateUserUseCase(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeDateProvider
    );
  });

  it('should be able to authenticate', async () => {
    await createUser.execute({
      name: 'Felipe Bigarelli',
      email: 'felipeteste@gmail.com',
      password: '123456',
      RA: 'a2053659',
    });

    const response = await authenticateUser.execute({
      email: 'felipeteste@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not authenticate a non-existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'notfound@gmail.com',
        password: '123456',
      })
    ).rejects.toMatchObject({
      message: 'Email or password incorrect',
      statusCode: 401,
    });
  });

  it('should not authenticate with incorrect password', async () => {
    await createUser.execute({
      name: 'Felipe Bigarelli',
      email: 'felipeteste@gmail.com',
      password: await hash('123456', 8), // Hashing a senha antes de salvar
      RA: 'a2053659',
    });

    await expect(
      authenticateUser.execute({
        email: 'felipeteste@gmail.com',
        password: 'wrongpassword',
      })
    ).rejects.toMatchObject({
      message: 'Email or password incorrect',
      statusCode: 401,
    });
  });
});
