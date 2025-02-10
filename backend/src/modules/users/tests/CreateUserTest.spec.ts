import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let createUser: CreateUserUseCase;
  let fakeUsersRepository: FakeUsersRepository;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserUseCase(fakeUsersRepository);
  });

  it('should not allow creating a user that already exists', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      RA: 'A12345',
    };

    // Criar usuário pela primeira vez
    await createUser.execute(userData);

    // Tentar criar o mesmo usuário novamente
    await expect(createUser.execute(userData)).rejects.toMatchObject({
      message: 'User already exists',
      statusCode: 403,
    });
  });

  it('should not allow creating a user with missing fields', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: '',
        password: '123456',
        RA: 'A12345',
      })
    ).rejects.toMatchObject({
      message: 'Missing fields, check again',
      statusCode: 400,
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: '',
        RA: 'A12345',
      })
    ).rejects.toMatchObject({
      message: 'Missing fields, check again',
      statusCode: 400,
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        RA: '',
      })
    ).rejects.toMatchObject({
      message: 'Missing fields, check again',
      statusCode: 400,
    });
  });
});
